module.exports = {
  init(app){
    const testRoutes = require("../routes/testServer");
    const indexRoutes = require("../routes/index");
    const listRoutes = require("../routes/lists");
    const itemRoutes = require("../routes/items");
    const userRoutes = require("../routes/users");

    app.use(testRoutes);
    app.use(indexRoutes);
    app.use(listRoutes);
    app.use(itemRoutes);
    app.use(userRoutes);
  }
}
