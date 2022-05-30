const {database} = require('../database/connection')

module.exports = {
    all: (request, response) => {
        const query = " select a.idsolicitud, a.fecha, CONCAT(b.nombres, ' ', b.apellidos) as nombre, c.id, c.pac, a.estado " + 
                      " from solicitud a " +
                      " inner join clientes b on a.idcliente = b.idcliente " +
                      " inner join producto c on a.idproducto = c.idproducto "
        
        database.query(query, (error, result) => {
            try {
                if (error) {
                    return response.json({
                        status: 400,
                        message: 'No se pudo listar las solicitudes',
                        result: error
                    })
                }
                return response.json({
                    status: 200,
                    result: result,
                    message: 'Solicitudes listadas exitosamente'
                })
            } catch (error) {
                console.log(`Hubo un error en la base de datos: ${ error.message }`)
            }
        })
    },
    attended: (request, response) => {
        const query = " select a.idsolicitud, a.fecha, CONCAT(b.nombres, ' ', b.apellidos) as nombre, c.id, c.pac, a.estado " + 
                      " from solicitud a " +
                      " inner join clientes b on a.idcliente = b.idcliente " +
                      " inner join producto c on a.idproducto = c.idproducto " +
                      " where a.estado = 1 "
        
        database.query(query, (error, result) => {
            try {
                if (error) {
                    return response.json({
                        status: 400,
                        message: 'No se pudo listar las solicitudes atendidas',
                        result: error
                    })
                }
                return response.json({
                    status: 200,
                    result: result,
                    message: 'Solicitudes atendidas listadas exitosamente'
                })
            } catch (error) {
                console.log(`Hubo un error en la base de datos: ${ error.message }`)
            }
        })
    },
    unattended: (request, response) => {
        const query = " select a.idsolicitud, a.fecha, CONCAT(b.nombres, ' ', b.apellidos) as nombre, c.id, c.pac, a.estado, a.idproducto, a.idcliente " + 
                      " from solicitud a " +
                      " inner join clientes b on a.idcliente = b.idcliente " +
                      " inner join producto c on a.idproducto = c.idproducto " +
                      " where a.estado = 0 "
        
        database.query(query, (error, result) => {
            try {
                if (error) {
                    return response.json({
                        status: 400,
                        message: 'No se pudo listar las solicitudes no atendidas',
                        result: error
                    })
                }
                return response.json({
                    status: 200,
                    result: result,
                    message: 'Solicitudes no atendidas listadas exitosamente'
                })
            } catch (error) {
                console.log(`Hubo un error en la base de datos: ${ error.message }`)
            }
        })
    },
    activate: (request, response) => {
        let params = request.body
        let {idsolicitud, idcliente, idproducto} = params

        const query = "UPDATE solicitud SET estado = 1 where idsolicitud = ?; " +
                      "UPDATE producto SET estado = 1 where idproducto = ?; " +
                      "SELECT correo FROM clientes where idcliente = ?; " 
        
        database.query(query, [idsolicitud, idproducto, idcliente], (error, result, fields) => {
            try {
                if (error) {
                    return response.json({
                        status: 400,
                        message: 'No se pudo activar la solicitud ',
                        result: error
                    })
                }
                
                return response.json({
                    status: 200,
                    result: result,
                    message: 'Solicitud atendida exitosamente'
                })
            } catch (error) {
                console.log(`Hubo un error en la base de datos: ${ error.message }`)
            }
        })
    }
}