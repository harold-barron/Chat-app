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

io.on('connection', (socket)=>{
    console.log('new websocket connection')
    socket.broadcast.emit('message', 'A new user has joined')
    
    socket.on('message',(message,callback)=>{
        io.emit('message', message)
        callback('delivered')
    })

    socket.on('sendLocation',({lat,long})=>{
        io.emit('message',`https://www.google.com/maps?q=${lat},${long}`)
    })

    socket.on('disconnect',()=>{
        io.emit('message','A user has left')
    })


})



server.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})