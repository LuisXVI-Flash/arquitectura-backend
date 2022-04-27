const jsonwebtoken = require('../util/jwt.util')

verifyToken = (request, response, next) => {
    try {
        let token = jsonwebtoken.getAuthorization(request).replace('Bearer ', '')
        if (!token) {
            return response.status(403).send({succes: false, message: 'No se encontro token'})
        }
        jsonwebtoken.verify(token)
        next()
    } catch (err) {
        return response.status(400).send({success: false, message: err.message})
    }
}

module.exports = {verifyToken}