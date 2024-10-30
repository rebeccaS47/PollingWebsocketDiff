const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    pingTimeout: 10000,
    pingInterval: 5000
});
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let messages = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/message', (req, res) => {
    const message = req.body.message;
    const newMessage = {
        text: message,
        timestamp: new Date()
    };
    messages.push(newMessage);
    
    // 當通過 HTTP 接收到新消息時，也通過 WebSocket 廣播
    io.emit('message-update', messages);
    console.log('New message via HTTP:', newMessage);
    
    res.json({ success: true });
});

app.get('/messages/short-polling', (req, res) => {
    res.json(messages);
});

app.get('/messages/long-polling', (req, res) => {
    const currentLength = parseInt(req.query.messageCount);
    
    if (messages.length <= currentLength) {
        const waitForMessage = () => {
            if (messages.length > currentLength) {
                return res.json(messages);
            }
            setTimeout(waitForMessage, 1000);
        };
        waitForMessage();
    } else {
        res.json(messages);
    }
});

io.on('connection', (socket) => {
    console.log('Client connected via WebSocket, ID:', socket.id);
    
    // 發送初始消息
    socket.emit('initial-messages', messages);
    console.log('Sent initial messages to client:', socket.id);
    
    // 處理新消息
    socket.on('new-message', (message) => {
        const newMessage = {
            text: message,
            timestamp: new Date()
        };
        messages.push(newMessage);
        console.log('New message via WebSocket from client', socket.id, ':', newMessage);
        
        // 廣播給所有客戶端，包括發送者
        io.emit('message-update', messages);
        console.log('Broadcasted message update to all clients');
    });

    socket.on('disconnect', (reason) => {
        console.log('Client disconnected:', socket.id, 'Reason:', reason);
    });

    socket.on('error', (error) => {
        console.error('Socket error for client', socket.id, ':', error);
    });
});

http.listen(3000, () => {
    console.log('Server running on port 3000');
});