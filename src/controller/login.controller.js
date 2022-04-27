const {database} = require('../database/connection')
const jsonwebtoken = require('../util/jwt.util')
const crypto = require('../util/crypto.util')

module.exports = {
    login: (request, response) => {
        try {
            let { data } = request.body
            let credentials = JSON.parse(data)
            let {username, password} = credentials
            if (!username || !password) {
                return response.json({
                    status: 400,
                    message: 'Credenciales invalidas'
                })
            }

            const encryptedPassword = crypto.encryptedPassword(password)
            const query = "select * from trabajadores where usuario = ? and contraseña = ?"

            database.query(query, [username, encryptedPassword], (error, result) => {
                try {
                    if (error) {
                        return response.json({
                            status: 400,
                            message: 'Error al listar: ' + error
                        })
                    }
                    if (!result.length) {
                        return response.json({
                            status: 400,
                            message: 'No existe el usuario'
                        })
                    }

                    let user = result[0]
                    let payload = jsonwebtoken.generateUserpayload(user)
                    let token = jsonwebtoken.generateToken(payload)
                    return response.json({
                        status: 200,
                        exist: 1,
                        message: 'usuario autorizado',
                        result: token
                    })
                } catch (error) {
                    console.log(error.message)
                    return response.json({
                        status: 500,
                        message: `Hubo un error en la base de datos: ${error.message}`
                    })
                }
            })
        } catch (error) {
            console.log(error.message)
            return response.json({
                status: 500,
                message: `Hubo un error en la base de datos: ${error}`
            })
        }
    }
}