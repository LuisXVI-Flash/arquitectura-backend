const auth = require('../middleware/auth.middleware')
const client = require('../controller/client.controller')

module.exports = app => {
    app.get('/client/list', client.list)
    app.put('/client/edit', [auth.verifyToken], client.edit)
    app.post('/client/add', [auth.verifyToken], client.add)
    app.delete('/client/delete/:idcliente', [auth.verifyToken], client.delete)
}