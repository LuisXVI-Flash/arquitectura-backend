const mysql = require('mysql')

let configuration = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT, 
    multipleStatements: true
}

let connection = mysql.createPool(configuration)

connection.getConnection((error) => {
    if (error) {
        console.log('Error en la conexion: ' + error.message)
        reconection(connection)
        return
    }

    console.log('Conexion establecida con exito')
})

function reconection(connection) {
    connection = mysql.createPool(configuration)
    connection.getConnection((error) => {
        if (error) {
            setTimeout(reconection(connection), 2500)
            return
        }
        console.log('Se ha restablecido la conexion con la base de datos')
        return connection
    })
}

connection.on('error', (error) => {
    console.log('No se pudo establecer una conexion con la base de datos. ', error.code)
    return reconection(connection)
})

module.exports = {
    database: connection
}