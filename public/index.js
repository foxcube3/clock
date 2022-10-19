import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const expressServer = http.createServer(app);

app.use(express.json());
app.use(express.static('public'));

const io = new Server(expressServer);

io.on('connect', function (socket) {
    console.log('a user is connected');

    setInterval(function () {
        let date = new Date().toLocaleTimeString()
        socket.send(date)
    }, 1000)

    socket.on('disconnect', () => {
        console.log('user disconnected.')
    })

})

app.get('/', (req, res, next) => {
    res.render('index.html');
})

expressServer.listen(4000, () => {
    console.log('server is listening on port 4000.')
})
