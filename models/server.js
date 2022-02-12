const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      usersRoutes: '/api/users',
      authRoutes: '/api/auth',
    };

    // Connect DB
    this.connectDB();
    // Middlewares
    this.middlewares();
    // Routes my app
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());
    // Lectura y parseo del body
    this.app.use(express.json());
    // Direcciorio public
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.paths.authRoutes, require('../routes/auth'));
    this.app.use(this.paths.usersRoutes, require('../routes/user'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
