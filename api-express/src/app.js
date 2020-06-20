const express = require('express');
const cors = require('cors');
const routes = require('./routes');

class App {
    
    constructor() {
        this.serve = express();
        this.configs();
        this.routes();
    }

    routes() {
        this.serve.use(routes);
    }

    configs() {
        this.serve.use(cors())
        this.serve.use(express.json());
    }

    middlewares() { }
}

module.exports = new App().serve;