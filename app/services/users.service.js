const {hashPassword, comparePassword} = require('../helpers/auth')
const User = require('../models/user');
const Rest = require('../utils/restware')
const jwt = require('jsonwebtoken');

module.exports = {
    register: async function (req, res) {
        try {
            const {name, email, password, avatar} = req.body;
            if (!name) {
                return res.status(400).json({
                    error: 'name is required'
                })
            }
            if (!password || password.length < 6) {
                return res.json({
                    error: "Password is required and should be at least 6 characters long"
                })
            };
            // Check email
            const exist = await User.findOne({ email })
            if (exist) {
                return res.json({
                    error: 'Email is taken already'
                })
            }

            const hashedPassword = await hashPassword(password)

            const user = await User.create({
                name, 
                email,
                password: hashedPassword,
                avatar
            })

            return res.status(200).json(user);
        } catch(error) {
            console.log(error)
            return res.status(400).json({error: "Something went wrong"});
        }
    },

    loginUser: async function(req, res) {
        try {
            const {email, password} = req.body;

            const user = await User.findOne({email});
            if (!user) {
                return res.json({
                    error: "No user found"
                })
            }

            const match = await comparePassword(password, user.password)
            if (match) {
                const payload = {
                    email: user.email,
                    id: user._id,
                    name: user.name,
                    avatar: user.avatar
                }
                jwt.sign(payload, "nguyenvietan131024*0949521462", {expiresIn: 1000}, (err, token) => {
                    if (err) throw err;
                    // return res.cookie('token', token).json(user)
                    return res.json({token: token})
                })
            }

            if (!match) {
                return res.json({
                    error: "Password do not match"
                })
            }
        } catch(error) {
            console.log(error);
            return res.status(400).json({error: "Something went wrong"});
        }
    },

    findUser: async function (req, res) {
        try {
            const {userId} = req.query;
            const userFound = await User.findById({_id: userId});

            return res.json(userFound);
        } catch(error) {
            console.log(error)
            return res.status(400).json({error: "Something went wrong"})
        }
    },

    getProfile: function (req, res) {
        try {
            const token = req.headers["authorization"];
            
            if (token) {
                jwt.verify(token, "nguyenvietan131024*0949521462", {}, (err, user) => {
                    if (err) {
                        return res.json({error: "token expired"});
                    } else {
                        return res.json({user: user});
                    }
                })
            } else {
                return res.json({message: "No token found"})
            }
        } catch (error) {
            console.log(error)
            return res.status(400).json({error: "Something went wrong"})
        }
    }
}