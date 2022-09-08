const socket = io() 


//elements
const $loginForm = document.querySelector('#avRooms')

//templates
const loginTemplate = document.querySelector('#login-template').innerHTML

socket.on('joiningPage',(message1=>{
    // console.log(message1)
    let aviableRooms = []
    message1.forEach((room)=> aviableRooms.push(room) )
    console.log(aviableRooms)
    // console.log(aviableRooms)
    const html = Mustache.render(loginTemplate,{
        aviableRooms
    })
    $loginForm.innerHTML = html
    // console.log('html',html)
}))
