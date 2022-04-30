const auth = require('../middleware/auth.middleware')
const user = require('../controller/user.controller')

module.exports = app => {
    app.get('/user/list', user.list)
    app.post('/user/add', [auth.verifyToken], user.add)
    app.put('/user/edit', [auth.verifyToken], user.edit)
    app.delete('/user/delete/:id', [auth.verifyToken], user.delete)
}