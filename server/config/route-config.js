module.exports = {
  init(app){
    const testRoutes = require("../routes/testServer");
    const indexRoutes = require("../routes/index");
    const listRoutes = require("../routes/lists");

    app.use(testRoutes);
    app.use(indexRoutes);
    app.use(listRoutes);
  }
}
