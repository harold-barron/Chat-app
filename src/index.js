const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const {generateMessage, generateLocationMessage}= require('./utils/messages')
const {addUser,removeUser,getUser,getUserInRoom} = require('./utils/trackUsers')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000

const publcicDirectoryPath = path.join(__dirname,'../public')

app.use(express.static(publcicDirectoryPath))

io.on('connection', (socket)=>{
    console.log('new websocket connection')
    
    socket.on('join', (options,callback)=>{
        const {error,user} = addUser({id:socket.id, ...options})
        
        if(error){
            return callback(error)
        }

        socket.join(user.room)

        socket.emit('message',generateMessage('Admin','Welcome!'))
        socket.broadcast.to(user.room).emit('message',generateMessage('Admin',`${user.username} has joined!` ))
        callback()
    })

    socket.on('message',(message,callback)=>{
        const user= getUser(socket.id)
        
        const filter = new Filter()
        if(filter.isProfane(message)){
            return callback('Profanity is not allowed')
        }
        io.to(user.room).emit('message', generateMessage(user.username,message))
        callback()
    })

    socket.on('sendLocation',({lat,long},callback)=>{
        const user= getUser(socket.id)
        const myLocation = `https://www.google.com/maps?q=${lat},${long}`
        io.to(user.room).emit('location',generateLocationMessage(user.username,myLocation))
        callback()
    })

    socket.on('disconnect',()=>{
        const user = removeUser(socket.id)
        console.log(user)
        if(user){
            io.to(user.room).emit('message',generateMessage('Admin',`${user.username} has left`))
        }
    })


})



server.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})

