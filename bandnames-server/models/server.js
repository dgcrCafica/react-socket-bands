// Servidor express
const express  = require('express');
const http     = require('http');
const socketIO = require('socket.io');
const path     = require('path');
const Sockets  = require('./sockets');
const cors     = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // http server
    this.server = http.createServer( this.app );

    // Configuración de socket
    this.io = socketIO( this.server, { /** Configuraciones */ });
  }

  middlewares() {
    // Configurar el directorio público
    this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );

    // CORS
    this.app.use( cors() );
  }

  configSockets() {
    new Sockets( this.io );
  }

  execute() {
    // Inicializar middlewares
    this.middlewares();

    // Inicializar sockets
    this.configSockets();

    // Inicializar server
    this.server.listen(this.port, () => {
      console.log('Server corriendo en el puerto: ', this.port);
    });
  }
}

module.exports = Server;