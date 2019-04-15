const itemQueries = require('../src/db/queries.items.js');

module.exports = {
  index(req, res, next) {
    itemQueries.getAllItems((err, items) => {
      if(err) {
        res.send('error');
      } else {
        res.send({items});
      }
    });
  },

  create(req, res, next) {
    let newItem = {
      body: req.body.body,
      listId: req.body.listId
    };
    itemQueries.addItem(newItem, (err, item) => {
      if(err){
        res.send('error');
      } else {
        res.send({item});
      }
    });
  },

  check(req, res, next){
    itemQueries.checkItem(req.params.id, req.body, (err, item) => {
      if(err || item == null){
        res.send('error');
      } else {
        res.send({item});
      }
    });
  },

  update(req, res, next){
    itemQueries.updateItem(req.params.id, req.body, (err, item) => {
      if(err || item == null){
        res.send('error');
      } else {
        res.send({item});
      }
    });
  },

  destroy(req, res, next){
    itemQueries.deleteItems(req.body.id, (err, items) => {
      if(err){
        res.send('error');
      } else {
        res.send({items});
      }
    });
  }
}
