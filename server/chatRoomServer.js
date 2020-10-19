const express = require('express')
const path = require('path')
const jQuery = require('jquery')
const http = require('http')
const socketIO = require('socket.io')
const ip = require('ip')
const PORT =process.env.PORT || 8001
const app = express()

const ipAddress =  ip.address()
app.use((req, res, next) => {
    console.log(req.method + " "+ req.url)
    next();
})

const server = http.createServer(app)
const publicPath = path.join(__dirname, '../public')

console.log(publicPath)

app.use(express.static(publicPath))

const io = socketIO(server)

io.on('connection', (socket) => {

    socket.emit('newUser', {
        from: 'Admin',
        text: 'Welcome to the Chat App',
        createdAt: new Date().getTime()
    })
    socket.broadcast.emit('newUser', {
        from: 'Admin',
        text: 'User Joined',
        createdAt: new Date().getTime()
    })
    socket.on('createMessage', (user) => {
        console.log(user)

        socket.emit('groupChat', {
            from: 'Me',
            text: user.text,
            
            
        })
        socket.broadcast.emit('groupChat', {
            from: 'Anonmyous',
            text: user.text,
        })
    })
    socket.on('ip', () => {
            socket.emit('getIP', {
                from: 'Me',
                ip: ipAddress
            })
             socket.broadcast.emit('getIP', {
                from: 'Anonmyous',
                ip: ipAddress
                })
        })
    socket.on('disconnect', () => {
        console.log('Client Disconnected')
    })
});

server.listen(PORT, () => {
    console.log('Server is Up at Port : ',PORT)
})

