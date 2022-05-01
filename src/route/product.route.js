const auth = require('../middleware/auth.middleware')
const product = require('../controller/product.controller')

module.exports = app => {
    app.get('/product/list', product.list)
    app.post('/product/add', [auth.verifyToken], product.add)
    app.put('/product/edit', [auth.verifyToken], product.edit)
    app.delete('/product/delete/:id', [auth.verifyToken], product.delete)
}