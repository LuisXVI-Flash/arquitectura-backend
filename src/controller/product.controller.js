const {database} = require('../database/connection')

module.exports = {
    list: (request, response) => {
        const query = `SELECT * FROM producto`

        database.query(query, (error, result) => {
            try {
                if (error) {
                    console.log(`Hubo un error al listar los productos: ${error}`)
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
        let {id, pac, estado} = params

        const query = "INSERT INTO producto(id, pac, estado) " +
                      "VALUES (?,?,?)"
                      
        database.query(query, [id, pac, estado], (error, result) => {
            try {
                if (error) {
                    return response.json({
                        status: 400,
                        message: 'El producto no pudo ser agregado',
                        result: error
                    })
                }

                return response.json({
                    status: 200,
                    result: result,
                    message: 'Producto agregado exitosamente'
                })
            } catch (error) {
                console.log(`Hubo un error en la base de datos: ${ error.message }`)
            }
        })         
    },
    edit: (request, response) => {
        let params = request.body
        let {productId, id, pac, estado} = params

        let query = "UPDATE producto SET id=?, pac=?, estado=? " + 
                    "WHERE idproducto=?"
        let data = [id, pac, estado, productId]

        database.query(query, data, (error, result) => {
            try {
                if (error) {
                    return response.json({
                        status: 400,
                        message: 'El producto no pudo ser actualizado.',
                        result: error
                    })
                }

                return response.json({
                    status: 200,
                    result: result,
                    message: 'Producto actualizado exitosamente.'
                })
            } catch (error) {
                console.log(`Ocurrio un error en la base de datos: ${ error.message }`)
            }
        })        
    },
    delete: (request, response) => {
        let id = request.params.id

        const query = "DELETE FROM producto WHERE idproducto=?"

        database.query(query, [id], (error, result) => {
            try {
                if (error) {
                    return response.json({
                        status: 400,
                        message: 'El producto no pudo ser eliminado.',
                        result: error
                    })
                }

                return response.json({
                    status: 200,
                    result: result,
                    message: 'Producto eliminado exitosamente.'
                })
            } catch (error) {
                console.log(`Hubo un error en la base de datos: ${ error.message }`)
            }
        }) 
    }
}