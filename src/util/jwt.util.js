const jwt = require('jsonwebtoken')
const token = process.env.TOKEN_KEY

exports.generateToken = (payload) => {
    return jwt.sign(payload,token,{expiresIn: '24h'})
}

exports.verify = (tokenObject) => {
    return jwt.verify(tokenObject, token)
}

exports.generateUserpayload = (user) => {
    return {
        id: user.idtrabajador,
        username: user.usuario,
        email: user.correo,
        first_name: user.nombres,
        last_name: user.apellidos,
        role_id: user.idcargo_trabajador
    }
}

exports.getAuthorization = (request) => {
    return request.headers.authorization
}

exports.getTokenPayload = (request) => {
    let authorization = this.getAuthorization(request)
    let token = authorization.replace('Bearer ', '')
    let array = token.split('.')
    let payload = JSON.parse(atob(array[1]))

    return payload ? payload : null
}