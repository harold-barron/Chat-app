const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')


const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000

const publcicDirectoryPath = path.join(__dirname,'../public')

app.use(express.static(publcicDirectoryPath))
let count =0
io.on('connection', (socket)=>{
    console.log('new websocket connection')
    socket.emit('countUpdated',count)

    socket.on('increment', ()=>{
        count++
        // socket.emit('countUpdated',count) //emit to an specific connection
        io.emit('countUpdated',count) //emit to all connections
    })
})

server.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})