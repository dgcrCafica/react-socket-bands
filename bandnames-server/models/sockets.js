const BandList = require('./band-list');

class Sockets {
  constructor( io ) {
    this.io = io;
    this.bandList = new BandList();
    this.socketEvents();
  }

  socketEvents() {

    this.io.on('connection', ( socket ) => {
      console.log('Cliente conectado');

      // Emitir al cliente conectado todas las bandas actuales
      socket.emit('current-bands', this.bandList.getBands());

      // Votar por la banda
      socket.on('vote-band', ( id ) => {
        this.bandList.increaseVotes( id );
        this.io.emit('current-bands', this.bandList.getBands());
      });

      // Borrar banda
      socket.on('delete-band', ( id ) => {
        this.bandList.removeBand( id );
        this.io.emit('current-bands', this.bandList.getBands());
      });

      // Cambiar nombre de la banda
      socket.on('change-band-name', ({ id, nombre }) => {
        this.bandList.changeBandName( id, nombre );
        this.io.emit('current-bands', this.bandList.getBands());
      });

      // Crear banda
      socket.on('create-band', ({ nombre }) => {
        this.bandList.addBand( nombre );
        this.io.emit('current-bands', this.bandList.getBands());
      });
    });

  }
}

module.exports = Sockets;