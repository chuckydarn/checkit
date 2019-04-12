const listQueries = require('../src/db/queries.lists.js');

module.exports = {
  index(req, res, next) {
    listQueries.getAllLists((err, lists) => {
      if(err) {
        res.send('error');
      } else {
        res.send({lists});
      }
    });
  },

  create(req, res, next) {
    let newList = {
      name: req.body.name
    };
    listQueries.addList(newList, (err, list) => {
      if(err){
        res.send('error');
      } else {
        res.send({list});
      }
    });
  }
}
