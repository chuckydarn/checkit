module.exports = {
  init(app){
    const indexRoutes = require("../routes/index");
    app.use(indexRoutes);
  }
}
