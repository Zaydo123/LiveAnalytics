const express = require('express');
const socketIO = require('socket.io');
const dotenv = require('dotenv');
const app = express();
const server = require('http').createServer(app);
dotenv.config();



const io = socketIO(server);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

    socket.on('message', (message) => {
        console.log('Received message:', message);
    });
});

app.use('/session', express.static(__dirname + '/public'));

server.listen(8000, () => {
    console.log('Server is running on port 8000');
});