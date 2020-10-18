var socket = io()

socket.on('newUser', (message) => {
    console.log(`${message.text} from ${message.from}`)
    console.log(message)
})
