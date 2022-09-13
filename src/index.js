const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const {generateMessage, generateLocationMessage}= require('./utils/messages')
const {addUser,removeUser,getUser,getUsersInRoom} = require('./utils/trackUsers')
const {getRooms,deleteRooms,aviableRooms,getSelectedRoom,sendNewRoom,deleteNewRoom} = require('./utils/trackRooms')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000

const publcicDirectoryPath = path.join(__dirname,'../public')


app.use(express.static(publcicDirectoryPath))

io.on('connection', (socket)=>{
    console.log('new websocket connection')
    const rooms = aviableRooms()
    // const roomSelected =[]
    socket.emit('joiningPage',rooms)
    socket.on('roomSelected', (newroomSelected)=>{
        getSelectedRoom(newroomSelected)
    })
    
    socket.on('join', (options,callback)=>{
        // console.log(options)
        const newRoom = sendNewRoom()
        // console.log(newRoom)
        const {error,user} = addUser({id:socket.id, ...options})
        if(user && newRoom){
            // console.log(newRoom[0])
            const users1 = getUsersInRoom(newRoom[0])
            // console.log(users1)
            const repeatedName = users1.find((usersOnline)=>{
                return usersOnline.username === user.username
            })
            if(repeatedName){
                socket.emit('repeatedName', 'Username in use')
                // return console.log('name',repeatedName)
            }
            if(user.room && newRoom != user.room){
                
                socket.emit('repeatedName', 'Please select the room that you want or text a new one')
            }
            if(newRoom && !user.room){
                user.room = newRoom[0]
            }
        }
        if(!user.room){
            socket.emit('repeatedName', 'Please text the room name')
        }
        if(user){
            const aviableRooms = getRooms(user.room)
        }
        
        if(error){
            return callback(error)
        }

        socket.join(user.room)
        deleteNewRoom()
        socket.emit('message',generateMessage('Admin',`Welcome ${user.username}!`))
        socket.broadcast.to(user.room).emit('message',generateMessage('Admin',`${user.username} has joined!` ))

        io.to(user.room).emit('roomData',{
            room: user.room,
            users: getUsersInRoom(user.room)
        })
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
        // console.log(user)
        if(user){
            const users = getUsersInRoom(user.room)
            io.to(user.room).emit('message',generateMessage('Admin',`${user.username} has left`))
            io.to(user.room).emit('roomData', {
                room:user.room,
                users
            })
            deleteRooms(user.room,users)
        }
    })


})

server.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})