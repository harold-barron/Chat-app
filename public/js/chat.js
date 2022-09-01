const socket = io()
socket.on('message', (message)=>{
    console.log(message)
})
document.querySelector('#message-form').addEventListener('submit',(e)=>{
    e.preventDefault()
    const message = document.querySelector('#message')
    // console.log(message)
    socket.emit('message',message.value)
})
// document.querySelector('#increment').addEventListener('click', ()=>{

//     console.log('button')
//     socket.emit('increment')
// })