var socket = io()
var messages = jQuery('ol')
socket.on('newUser', (message) => {
    console.log(`${message.text} from ${message.from}`)
    console.log(message)
    messages.append(`<li> ${message.from}: ${message.text}</li>`)
})

jQuery('#message-form').on('submit', function (e) { 
    e.preventDefault()
    console.log(jQuery("#message").val())

    socket.emit('createMessage', {
        from: socket.id,
        text: jQuery('[name=message]').val(),
      
    })
})

socket.on('groupChat', function(message){
    messages.append(`<li> ${message.from}: ${message.text}</li>`)
})
