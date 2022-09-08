let rooms = []

const getRooms = (room)=>{

    const roomName = room.trim().toLowerCase()
    const isNewRoom = rooms.find((room) => room.roomName === roomName)
    if(!isNewRoom){
        rooms.push({roomName})
    }
    // console.log(rooms)
    return {rooms}   
}

const deleteRooms = (roomName,users)=>{
    console.log(`${roomName}`)
    console.log(users)
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

module.exports = {
    getRooms,
    deleteRooms
}