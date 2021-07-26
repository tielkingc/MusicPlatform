import express from '../../node_modules/express';
const app = express();
const server = require('http').createServer(app)
//Allows us to pass everthing and no cors errors
// const io = require('socket.io')(server, { cors: { origin: "*"}})
// const io = require('socket.io')
// import io from '../../node_modules/socket.io'
const io = require('socket.io').listen(server)
server.listen(3001)

//Rendering
app.get('/home', (req, res) => {
    res.render('community')
})

server.listen(3001, () => {
    console.log('Server running');
});

//Set the connection, uses the socket variable
//Socket is a person and has a different connection
io.on("connection", (socket) => {
    console.log("User Connected: " + socket.id);
    //This creates the socket variables

    socket.on("message", (data) => {
        console.log(data)
        //This will broadcast the data to everyone but yourself.
        socket.broadcast.emit('message', data)
    });

})
