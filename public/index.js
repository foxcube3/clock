#// Define libraries
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
#// Define app & server
const app = express();
const expressServer = http.createServer(app);
app.use(express.json());
app.use(express.static('public'));
#// Invoke defined server
const io = new Server(expressServer);
#// Print server-side when user connects
io.on('connect', function (socket) {
    console.log('a user is connected');
#// Serve realtime serverside clock
    setInterval(function () {
        let date = new Date().toLocaleTimeString()
        socket.send(date)
    }, 1000)
#// Print server-side when user disconnects
    socket.on('disconnect', () => {
        console.log('user disconnected.')
    })

})
#// Serve primary HTML
app.get('/', (req, res, next) => {
    res.render('index.html');
})
#// Server listens for requests at FQDN or IP:8080
expressServer.listen(8080, () => {
    console.log('server is listening on port 8080.')
})
