let rooms = []
let roomSelected =  []
// const trackUsers = require('./trackUsers')
const getRooms = (room)=>{
    console.log(room)
    const roomName = room.trim().toLowerCase()
    const isNewRoom = rooms.find((room) => room.roomName === roomName)
    if(!isNewRoom){
        rooms.push({roomName})
    }
    // console.log(rooms)
    return {rooms}   
}
const aviableRooms = () =>{
   return rooms
}
const deleteRooms = (roomName,users)=>{
    // console.log(`${roomName}`)
    // console.log(users)
    if(users){
        
       const isARoom = users.find((user) => user.room === roomName)
       if(!isARoom){ 
            var newArray = rooms.filter((room)=> room.roomName !== roomName)      
            rooms = newArray
            return rooms
        }
        console.log(`Aun hay usuarios en ${roomName}`)
    }
    
    
}

const getSelectedRoom = (selectedRoom)=>{
    // console.log(roomSelected)
    console.log(selectedRoom)
    if(selectedRoom){
        roomSelected.push(selectedRoom)
    }
    return {roomSelected}
   
}

const sendNewRoom = ()=>{
    if(roomSelected && roomSelected.length>0 ){
        return roomSelected
    }
    return roomSelected = null
}

const deleteNewRoom = (roomName)=>{
    // console.log(`${roomName}`)
    // console.log(users)
    return roomSelected = []  
}

module.exports = {
    getRooms,
    deleteRooms,
    aviableRooms,
    getSelectedRoom,
    sendNewRoom,
    deleteNewRoom
}