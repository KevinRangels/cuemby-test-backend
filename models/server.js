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
      settingRoutes: '/api/settings',
      playerRoutes: '/api/players',
      teamRoutes: '/api/teams',
      leagueRoutes: '/api/leagues',
      countryRoutes: '/api/countries',
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
    this.app.use(this.paths.settingRoutes, require('../routes/settings'));
    this.app.use(this.paths.playerRoutes, require('../routes/player'));
    this.app.use(this.paths.teamRoutes, require('../routes/team'));
    this.app.use(this.paths.leagueRoutes, require('../routes/leagues'));
    this.app.use(this.paths.countryRoutes, require('../routes/countries'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
