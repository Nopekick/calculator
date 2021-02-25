const server = require('http').createServer();
const io = require('socket.io')(server, {
    pingTimeout: 60000, 
    cors: {
        origin: "*",
  } });

const PORT = process.env.PORT || 8080

io.on('connection', client => {
    console.log("new connection")

    client.on('log', data => { 
        console.log(data)
        client.broadcast.emit('log', data)
    });
});

server.listen(PORT, ()=>{
    console.log("server starting on", PORT)
});