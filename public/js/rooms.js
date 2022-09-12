

// const socket = io() 


// //login elements
// const $outerForm = document.querySelector('#login-form')
// const $loginForm = document.querySelector('#avRooms')

// //login templates
// const loginTemplate = document.querySelector('#login-template').innerHTML

// socket.on('joiningPage',(message1=>{
//     // console.log(message1)
//     let aviableRooms = []
//     message1.forEach((room)=> aviableRooms.push(room) )
//     console.log(aviableRooms)
//     // console.log(aviableRooms)
//     const html = Mustache.render(loginTemplate,{
//         aviableRooms
//     })
//     $loginForm.innerHTML = html
//     // console.log('html',html)
// }))

// socket.on('newData', (data)=>{
//     console.log('new data',data)
// })


// $outerForm.addEventListener('submit', (e)=>{
    // e.preventDefault()
    // console.log('click')
    // username = e.target.elements.username.value
    // roomSelected= e.target.elements.rooms.value
    // roomTexted = e.target.elements.roomNameText.value
    // // console.log(roomSelected, roomTexted)
    // if(!roomSelected && !roomTexted){
    //     return alert('there is no aviable rooms pleas create a new one texting the name')
    // }
    // if(!roomTexted && roomSelected == 'undefined' ){
    //     return alert('Seleccione o escriba la sala a la que desea entrar')
    // }
    // if(roomSelected || roomTexted){
    //     if(roomTexted === roomSelected){
    //         roomTexted = roomSelected
    //     }
    //     else if(!roomTexted){
    //         roomTexted = roomSelected
    //     }
    //     else if(!roomSelected || roomSelected == 'undefined'){
    //         roomTexted = roomTexted
    //     }
    //     else{
    //         return alert('Select the same room that you texted')
    //     }
        
    // }
    
    // const data = {
    //     username,
    //     room:roomTexted
    // }
    // // console.log(data)
    // socket.emit('sendForm', data)
    // console.log('data sended')
    // // const roomSelected = e.target.elements.Rooms.value
    
// })

// socket.emit('join', {username,room}, (error)=>{
//     if(error){
//         alert(error)
//         location.href = '/'
//     }
// })