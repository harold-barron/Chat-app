const socket = io() 

//login elements
const $outerForm = document.querySelector('#avRooms')
const $loginForm = document.querySelector('#avRooms')

//login templates
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

$outerForm.addEventListener('click', (e)=>{
    e.preventDefault()
    roomSelected= e.target.value
    // console.log(roomSelected)
    if(roomSelected !== 'undefined'){
        console.log(roomSelected)
        socket.emit('roomSelected',roomSelected)
    }
})