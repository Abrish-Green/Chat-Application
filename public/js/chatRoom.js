var socket = io()
var messages = jQuery('ol')

socket.on('newUser', (message) => {
    console.log(`${message.text} from ${message.from}`)
    console.log(message)
    messages.append(`<li> ${message.from}: ${message.text}</li>`)
})

jQuery('#send').on('click', function (e) { 
    e.preventDefault()
    console.log(jQuery("#message").val())

    socket.emit('createMessage', {
        from: socket.id,
        text: jQuery('[name=message]').val(),
      
    })
})

jQuery('#ip').on('click', function(e) {
    e.preventDefault()
    socket.emit('ip')
    console.log('clicked')
})

socket.on('getIP', function (message) {
    console.log(message.ip)
    messages.append(`<li> ${message.from}: ${message.ip}</li>`)
    console.log('clicked')

    })
socket.on('groupChat', function(message){
    messages.append(`<li> ${message.from}: ${message.text}</li>`)
})
