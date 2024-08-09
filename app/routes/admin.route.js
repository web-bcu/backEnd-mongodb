const adminService = require('../services/admin.service')

module.exports = function (app) {
    app.post('/admin/create', adminService.addAdmin);
    app.get('/admin/get', adminService.getAdmin)
    app.delete('/admin/delete', adminService.deleteAdmin);
    app.put('/admin/update', adminService.editAdmin);
}