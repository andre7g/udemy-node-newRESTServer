const express = require('express');
const cors = require('cors');


class Server {
    constructor() {
        //Variables
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'; //variable string ruta usuarios
        //Middleware
        this.middlewares();

        //Rutas de mi app
        this.routes();
    }
    middlewares() {
        //Directorio publico
        //Llama la carpeta 'public' que contiene el 'index' en el path'/'
        this.app.use(express.static('public'));
        //CORS
        this.app.use(cors());
        //Lectura y parse de Body
        this.app.use(express.json());
    }
    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port);
        });
    }
}

module.exports = Server;