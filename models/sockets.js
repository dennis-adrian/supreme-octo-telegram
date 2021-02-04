const BandList = require('./bandList');
class Sockets {
    constructor(io) {
        this.io = io;

        this.bandList = new BandList();
        this.socketEvents();
    }

    socketEvents() {
        //on connection
        this.io.on('connection', (socket) => {
            console.log('client connected');

            //emit all bands to connected client
            socket.emit('current-bands', this.bandList.getBands());

            //vote for a band
            socket.on('vote-band', (data) => {
                this.bandList.increaseVotes(data.id);
                this.io.emit('current-bands', this.bandList.getBands());
            });

            //remove a band
            socket.on('remove-band', ({ id }) => {
                this.bandList.removeBand(id);
                this.io.emit('current-bands', this.bandList.getBands());
            });

            //change band name
            socket.on('change-band-name', ({ id, name }) => {
                this.bandList.changeBandName(id, name);
                this.io.emit('current-bands', this.bandList.getBands());
            });

            //add band
            socket.on('add-band', ({ name }) => {
                this.bandList.addBand(name);
                this.io.emit('current-bands', this.bandList.getBands());
            });
        });
    }
}

module.exports = Sockets;
