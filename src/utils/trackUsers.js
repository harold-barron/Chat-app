const users = []

//addUser, removeUSer, getUser, getUserInRoom


const addUser = ({id,username,room})=>{
    //Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()


    //Validate data

    if (!username || !room){
        return{
            error: 'Username and room are required'
        }
    }
    //check for existing user

    const existingUser = users.find((user)=>{
        return user.room === room && user.username === username
    })

    //validate Username
    if (existingUser){
        return {
            error: 'username is in use'
        }
    }

    //store user
    const user = {id,username,room}
    users.push(user)
    return(user)
}

const removeUser = (id) =>{
    const index = users.findIndex((user)=>user.id === id)

    if(!index === -1){
        return users.splice(index,1)[0]
    }

}

const getUser = (id) =>{
    return users.find((user)=> user.id === id)
}

const getUserInRoom = (room)=>{
    return users.filter((user) => user.room === room)
}

addUser({
    id:1,
    username:'h',
    room:'r1'
})
addUser({
    id:3,
    username:'h3',
    room:'r1'
})
addUser({
    id:1,
    username:'h2',
    room:'r2'
})

console.log(getUserInRoom('r2'))