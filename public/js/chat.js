const socket = io()

//elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('#message')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector("#messages")


//templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#locationTemplate').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

//options
const {username,room}=  Qs.parse(location.search, {ignoreQueryPrefix:true})
// let isNewRoom = []



const autoScroll = ()=>{
    //new messagee element
    const $newMessage = $messages.lastElementChild

    //height of the new value
    const newMessageStyle = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyle.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    //vsibible height
    const visibleHeight = $messages.offsetHeight

    //height of messages container
    const contentHeight = $messages.scrollHeight

    //How far have i scrolled
    const scrollOffset = $messages.scrollTop + visibleHeight

    if (contentHeight- newMessageHeight <= scrollOffset){
        $messages.scrollTop = $messages.scrollHeight
    }
    console.log(newMessageMargin)
}

socket.on('message', (message)=>{

    console.log(message)
    const html = Mustache.render(messageTemplate,{
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend',html)
    autoScroll()
})

socket.on('location',(response)=>{
    console.log(response)
    const html = Mustache.render(locationTemplate,{
        username: response.username,
        sendLocation: response.location,
        createdAt: moment(response.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend',html)
    autoScroll()
})

socket.on('roomData', ({room,users}) =>{
    const html = Mustache.render(sidebarTemplate,{
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML = html
})

$messageForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    $messageFormButton.setAttribute('disabled','disabled')
    //disable
    const message = e.target.elements.message.value

    socket.emit('message',message, (error)=>{
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()
        //enable
        if(error){
            return console.log(error)
        }
        console.log('message delivered')
    })
})

$sendLocationButton.addEventListener('click', ()=>{
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by yor browser')
    }
    $sendLocationButton.setAttribute('disabled','disabled')

    navigator.geolocation.getCurrentPosition((position)=>{
        
        socket.emit('sendLocation', {
            lat: position.coords.latitude,
            long: position.coords.longitude
        }, (error)=>{
            if(error){
                return console.log(error)
            }
            console.log('Location shared')
            $sendLocationButton.removeAttribute('disabled')
        })
        
    })
})
socket.on('repeatedName', (message)=>{
    alert(message)
    location.href = '/'
})
socket.emit('join', {username,room}, (error)=>{    
    
    if(error){
        alert(error)
        location.href = '/'
    }
})
