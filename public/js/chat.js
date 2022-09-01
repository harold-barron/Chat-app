const socket = io()
socket.on('message', (message)=>{
    console.log(message)
})

document.querySelector('#message-form').addEventListener('submit',(e)=>{
    e.preventDefault()
    const message = document.querySelector('#message')
    // console.log(message)
    socket.emit('message',message.value, (response)=>{
        console.log('message delivered',response)
    })
})

document.querySelector('#send-location').addEventListener('click', ()=>{
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by yor browser')
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        
        socket.emit('sendLocation', {
            lat: position.coords.latitude,
            long: position.coords.longitude
        })
        
    })
})