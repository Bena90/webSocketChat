const express = require('express');
const { Server: IOServer } = require('socket.io')
const path = require('path')
const app = express();

const expressServer = app.listen (8080, () => console.log('Run server on port 8080'))

const io = new IOServer(expressServer);

app.use(express.static(path.join(__dirname, '../public'))) 

let messagesArray= []

io.on ('connection', (socket) =>{
    console.log(`Se conectó un usuario: ${socket.id}`)
    io.emit('server:messages', messagesArray)

    socket.on ('client:message', messageInfo=>{
        messagesArray.push(messageInfo)
        io.emit('server:messages', messagesArray)
    })
})