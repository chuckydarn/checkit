module.exports = {
  init(app){
    const testRoutes = require("../routes/testServer");
    const indexRoutes = require("../routes/index");
    const listRoutes = require("../routes/lists");
    const itemRoutes = require("../routes/items");

    app.use(testRoutes);
    app.use(indexRoutes);
    app.use(listRoutes);
    app.use(itemRoutes);
  }
}
