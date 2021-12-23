const {
    platform
} = require('os');
const socket = require('socket.io'),
    colors = require('colors')
http = require('http'),
    fs = require('fs'),
    path = require('path');

const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, './index.html');
    const readStream = fs.createReadStream(indexPath);

    readStream.pipe(res)
});


connections = [];


const io = socket(server);
io.on('connection', (client) => {
    console.log(`User has connected`);
    connections.push(client);


    client.on('client-msg', (data) => {
        console.log(data); //вернется на сервер сообщение пользователя

        const payload = {
            message: data.message, //.split('').reverse().join(''),
            user: data.name,
        };


        client.broadcast.emit('server-msg', payload);
        client.emit('server-msg', payload);
    });

    client.on('reconnect', (client) => {
        console.log('reconnect!');
    });

    client.on('disconnecting', (client) => {
        console.log('Disconnecting...');
    });

    client.on('disconnect', (client) => {
        connections.splice(connections.indexOf(client), 1);
        console.log(`User has disconnected`);
    });

});


server.listen(5555);