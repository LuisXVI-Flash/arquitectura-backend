const {database} = require('../database/connection')

module.exports = {
    list: (request, response) => {
        const query = `SELECT * FROM clientes`

        database.query(query, (error, result) => {
            try {
                if (error) {
                    console.log(`Hubo un error al listar los clientes: ${error}`)
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
        let {nombres, apellidos, correo, dni, celular} = params

        const query = "INSERT INTO clientes(nombres, apellidos, correo, dni, celular) " +
                      "VALUES (?,?,?,?,?)"
                      
        database.query(query, [nombres, apellidos, correo, dni, celular], (error, result) => {
            try {
                if (error) {
                    return response.json({
                        status: 400,
                        message: 'El cliente no pudo ser agregado',
                        result: error
                    })
                }

                return response.json({
                    status: 200,
                    result: result,
                    message: 'Cliente agregado exitosamente'
                })
            } catch (error) {
                console.log(`Hubo un error en la base de datos: ${ error.message }`)
            }
        })        
    },
    edit: (request, response) => {
        let params = request.body
        let {idcliente, nombres, apellidos, correo, dni, celular} = params

        let query = "UPDATE clientes SET nombres=?, apellidos=?, correo=?, dni=?, celular=?" + 
                    "WHERE idcliente=?"
        let data = [nombres, apellidos, correo, dni, celular, idcliente]

        database.query(query, data, (error, result) => {
            try {
                if (error) {
                    return response.json({
                        status: 400,
                        message: 'El cliente no pudo ser actualizado.',
                        result: error
                    })
                }

                return response.json({
                    status: 200,
                    result: result,
                    message: 'Cliente actualizado exitosamente.'
                })
            } catch (error) {
                console.log(`Ocurrio un error en la base de datos: ${ error.message }`)
            }
        })
    },
    delete: (request, response) => {
        let id = request.params.idcliente

        const query = "DELETE FROM clientes WHERE idcliente=?"

        database.query(query, [id], (error, result) => {
            try {
                if (error) {
                    return response.json({
                        status: 400,
                        message: 'El cliente no pudo ser eliminado.',
                        result: error
                    })
                }

                return response.json({
                    status: 200,
                    result: result,
                    message: 'Cliente eliminado exitosamente.'
                })
            } catch (error) {
                console.log(`Hubo un error en la base de datos: ${ error.message }`)
            }
        })        
    }
}