const express = require('express')
const path = require('path')
const http = require('http')
const socketIO = require('socket.io')
const PORT =process.env.PORT || 8000
const app = express()
app.use((req, res, next) => {
    console.log(req.method + " "+ req.url)
    next();
})
const server = http.createServer(app)
const publicPath = path.join(__dirname ,'../public')
app.use(express.static(publicPath))


const io = socketIO(server)

io.on('connection', (socket) => {
    console.log('new user connected')

    socket.on('disconnect', () => {
        console.log('Client Disconnected')
    })
});


console.log(publicPath)

server.listen(PORT, () => {
    console.log('Server is Up at Port : ',PORT)
})