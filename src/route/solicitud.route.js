const auth = require('../middleware/auth.middleware')
const solicitud = require('../controller/solicitud.controller')

module.exports = app => {
    app.get('/solicitud/all', [auth.verifyToken], solicitud.all)
    app.get('/solicitud/attended', [auth.verifyToken], solicitud.attended)
    app.get('/solicitud/unnatended', [auth.verifyToken], solicitud.unattended)
    app.post('/solicitud/activate', [auth.verifyToken], solicitud.activate)
    app.post('/solicitud/create', /*[auth.verifyToken],*/ solicitud.add)
}