require('dotenv').config();
const session = require('express-session');

module.exports = {
  init(app, express) {
    app.use(session({
      secret: process.env.cookieSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {maxAge: 1.21e+9}
    }));
  }
}
