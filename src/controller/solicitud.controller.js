const {database} = require('../database/connection')
const email = require('nodemailer')

let send_correo = email.createTransport({
    "host":"smtp.gmail.com",
    "port":"465",
    "secure":"true",
    "auth":{
        "type":"login",
        "user":"soporte.prueba.node@gmail.com",
        "pass":"#2017untels$"
    }
})

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
                
                let email = JSON.parse(JSON.stringify(result[2]))

                let email_content = {
                    from:"soporte.prueba.node@gmail.com",
                    to:email[0].correo,
                    subject:"PRODUCTO ACTIVADO!!! Gracias por elegir TECA",
                    html:`
                        <div> 
                        <p>Hola amigo</p> 
                        <p>Te informamos que tu dispositivo ha sido activado</p> 

                        </div> 
                    `
                }

                send_correo.sendMail(email_content)

                return response.json({
                    status: 200,
                    result: result,
                    message: 'Solicitud atendida exitosamente'
                })
            } catch (error) {
                console.log(`Hubo un error en la base de datos: ${ error.message }`)
            }
        })
    },
    add: (request, response) => {
        let params = request.body
        let {nombres, apellidos, correo, dni, celular, idproducto} = params
        
        const query = "INSERT into CLIENTES(nombres, apellidos, correo, dni, celular) values(?,?,?,?,?);" + 
                      "SELECT idcliente from CLIENTES WHERE dni=?;"

        database.query(query,[nombres,apellidos,correo,dni,celular,dni], (error, result, fields) => {
            try {
                if (error) {
                    return response.json({
                        status: 400,
                        message: 'No se pudo insertar al cliente ',
                        result: error
                    })
                }

                let idCliente = JSON.parse(JSON.stringify(result[1]))

                const insertQuery = "INSERT into SOLICITUD(idproducto, idcliente) values(?,?)"

                database.query(insertQuery, [idproducto, idCliente[0].idcliente], (error, result) => {
                    if (error) {
                        return response.json({
                            status: 400,
                            message: 'No se pudo insertar la solicitud ',
                            result: error
                        })
                    }

                    return response.json({
                        status: 200,
                        result: result,
                        message: 'Solicitud creada exitosamente'
                    })
    
                })
            } catch (error) {
                console.log(`Hubo un error en la base de datos: ${ error.message }`)
            }
        })

    }    
}