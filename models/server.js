//Express server
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        //using dotenv to get the PORT from the enviroment variable file (.env)
        this.port = process.env.PORT;

        //Http server
        this.server = http.createServer(this.app);
        //Sockets configurations
        this.io = socketio(this.server, {
            /* configurations */
        });
    }

    middlewares() {
        //Deploy public directory
        this.app.use(express.static(path.resolve(__dirname, '../public')));
        //CORS
        this.app.use(cors());
    }
    
    socketsConfig(){
        new Sockets(this.io);
    }

    execute() {
        //initialize middlewares
        this.middlewares();

        //initialize sockets
        this.socketsConfig();

        //initialize server
        this.server.listen(this.port, () => {
            console.log(`Connected at http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;
