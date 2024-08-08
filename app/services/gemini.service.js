const { GoogleGenerativeAI } = require('@google/generative-ai');

module.exports = {
    playGames: async function (req, res) {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
        const generationConfig = {
            stopSequences: ["red"],
            maxOutputTokens: 100,
            temperature: 0.9,
            topP: 0.1,
            topK: 16,
        };
        try {
            const { board } = req.body;
    
            if (!board || !board.length) {
                return res.json({ error: "Invalid board data" }, { status: 400 });
            }
    
            // const prompt = [
            //     'You are an expert tic tac toe player.',
            //     'You play as O. Focus on winning, play extremely well.',
            //     'For the JSON content I provide as input, please just give me JSON output containing the row and the col (no explanation) of your next move so you can definitely win in this tic tac toe game.',
            //     'You just can play in the cell which has no X or O',
            //     board
            // ].join(' ');

            const prompt = [
                "You are an expert Tic Tac Toe player.",
                "You play as O and your objective is to win the game.",
                "Analyze the board provided and respond with the optimal row and column for your next move in JSON format, ensuring that you can only place your move in a cell that does not already contain an X or O.",
                "Focus on strategies that maximize your chances of winning while blocking the opponent's opportunities.",
                "You don't have to explain, just return an object with format {row: , col: }",
                "The JSON response should only include the coordinates of your move.",
                JSON.stringify(board)
            ].join(' ');
    
            const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig });
            const result = await model.generateContent(prompt);
            const response = result.response.text();
    
            const aiMove = JSON.parse(response);
    
            console.log(aiMove);
    
            return res.status(200).json(aiMove);
        } catch (error) {
            console.error("Error during AI move generation:", error);
            return res.json({ error: "Failed to generate AI move" }, { status: 500 });
        }
    }
}