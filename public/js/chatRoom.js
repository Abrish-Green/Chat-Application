var socket = io()
var messages = jQuery('ul')

socket.on('newUser', (message) => {
    console.log(`${message.text} from ${message.from}`)
    console.log(message)
   
    
    //messages.append(`<li><b style="color:green">${message.from}</b> : ${message.text} </li><b class="time" style="font-size:10px;">${message.time}</b>`)
})


jQuery('#message-form').on('submit', function (e) { 
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
    messages.append(`<li><b> ${message.from}</b><b class="time">${message.time}</b> ${message.ip}</li>`)
    console.log('clicked')

    })
socket.on('groupChat', function(message){
    messages.append(`<li><b> ${message.from}</b><b class="time">${message.time}</b> </li><li class="messages">${message.text}</li>`)
   
})

function autoUpdate() { 
    
        socket.on('autoReload', function (message) { 
            jQuery('#users').html('')
             message.all_users.forEach(function (user) {
             let  tempUser =  (user.substr(0, 3) + '@User').toUpperCase()
            jQuery('#users').append(`<li class="users-class">${tempUser}</li>`)
        })
        })
    console.log("reloading...")
    }


setInterval(autoUpdate,1000)


