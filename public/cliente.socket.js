const socket = io();

const messageForm = document.querySelector('#messageForm')
const usernameInput = document.querySelector('#usernameInput')
const messageInput = document.querySelector('#messageInput')
const messagesPool = document.querySelector('#messagesPool')

const sendMessage = (messageInfo) => {
    socket.emit ('client:message', messageInfo)
}

const renderMessages = (messagesInfo) => {
    const html = messagesInfo.map( msg =>{
        return(`
            <div>
            <strong>${msg.username}</strong>
            <em>${msg.message}</em>
        `)
    }).join(' ')
    messagesPool.innerHTML = html
}

const submitHandler = (e) =>{
    e.preventDefault();
    const messageInfo = {
        username: usernameInput.value,
        message: messageInput.value,
    }

    sendMessage(messageInfo)
}

messageForm.addEventListener('submit', submitHandler);

socket.on ('server:messages', renderMessages)
