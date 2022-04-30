require('dotenv').config()
const express = require('express')
const http = require('http')
const app = express()
const cors = require('cors')
const server = http.createServer(app)
const port = 4100

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Aplicacion desplegada')
})

require('./src/route/login.route')(app)
require('./src/route/user.route')(app)

server.listen(port, '0.0.0.0', () => {
    console.log(`Servidor corriendo en puerto ${port}`)
})

