class Sockets {
    constructor(io) {
        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        //on connection
        this.io.on('connection', (socket) => {
            //listening event 'client-message'
            socket.on('client-message', (data) => {
                console.log(data);
                this.io.emit('server-message', data);
            });
        });
    }
}

module.exports = Sockets;
