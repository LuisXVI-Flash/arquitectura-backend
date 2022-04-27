const auth = require('../controller/login.controller')

module.exports = app => {
    app.post('/login', auth.login)
}