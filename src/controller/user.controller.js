const {database} = require('../database/connection')
const crypto = require('../util/crypto.util')

module.exports = {
    list: (request, response) => {
        const query = `SELECT * FROM trabajadores`
        database.query(query, (error, result) => {
            try {
                if (error) {
                    console.log(`Hubo un error al listar los trabajadores: ${error}`)
                    return response.json({
                        status: 400,
                        result: error
                    })
                }

                return response.json({
                    status: 200,
                    result: result
                })
            } catch (error) {
                console.log(`Hubo un error en la base de datos: ${error.message}`)
            }
        })
    },
    add: (request, response) => {
        let params = request.body
        let {nombre, apellido, correo, usuario, password, rol} = params
        const encryptedPassword = crypto.encryptedPassword(password)

        const query = "INSERT INTO trabajadores(nombres, apellidos, correo, contraseña, usuario, idcargo_trabajador, estado) " +
                      "VALUES (?,?,?,?,?,?,1)"
                      
        database.query(query, [nombre, apellido, correo, encryptedPassword, usuario, rol], (error, result) => {
            try {
                if (error) {
                    return response.json({
                        status: 400,
                        message: 'El usuario no pudo ser agregado',
                        result: error
                    })
                }

                return response.json({
                    status: 200,
                    result: result,
                    message: 'Usuario agregado exitosamente'
                })
            } catch (error) {
                console.log(`Hubo un error en la base de datos: ${ error.message }`)
            }
        })
    },
    edit: (request, response) => {
        let params = request.body
        let {id, nombre, apellido, correo, username, password, rol, active} = params

        let query = "UPDATE trabajadores SET nombres=?, apellidos=?, correo=?, usuario=?, idcargo_trabajador=?, estado=?"
        let data = [nombre, apellido, correo, username, rol, active]

        if (password) {
            query += ", password=?"
            data.push(crypto.encryptedPassword(password))
        }

        query += " WHERE idtrabajador=?"
        data.push(id)

        database.query(query, data, (error, result) => {
            try {
                if (error) {
                    return response.json({
                        status: 400,
                        message: 'El usuario no pudo ser actualizado.',
                        result: error
                    })
                }

                return response.json({
                    status: 200,
                    result: result,
                    message: 'Usuario actualizado exitosamente.'
                })
            } catch (error) {
                console.log(`Ocurrio un error en la base de datos: ${ error.message }`)
            }
        })
    },
    delete: (request, response) => {

        let id = request.params.id

        const query = "DELETE FROM trabajadores WHERE idtrabajador=?"

        database.query(query, [id], (error, result) => {
            try {
                if (error) {
                    return response.json({
                        status: 400,
                        message: 'El trabajador no pudo ser eliminado.',
                        result: error
                    })
                }

                return response.json({
                    status: 200,
                    result: result,
                    message: 'Usuario eliminado exitosamente.'
                })
            } catch (error) {
                console.log(`Hubo un error en la base de datos: ${ error.message }`)
            }
        })
    }
}