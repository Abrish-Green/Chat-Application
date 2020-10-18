var socket = io()

function dom(text) {

    var emittedEvent = []
    emittedEvent.push(text)
    emittedEvent.forEach(function(events){
        document.getElementById('event').innerHTML += '<li style="text-decoration:underline;color:red;">' + events + ' Event Emitted</li> ';
    });

 }
socket.on('connect', () => {
    console.log(socket.id,'Connected to server')
})

socket.on('updateAvaliable', function () { 
    console.log('Update Avaliable...')
    dom('updateAvalible')
})

socket.emit('request', {
    name: 'Abrham Green'
})

socket.emit('ask', {
    question: 'What is the Port?'
})

socket.on('response', function (response) {
    console.log(response)
    dom('response')
})

socket.on('emitted', function () {
    console.log('emitted')
    dom('emitted')
})

socket.on('disconnect',()=>{
    console.log('Disconnected from server')
})

