const Item = require("./models").Item;

module.exports = {
  getAllItems(callback){
    return Item.all()
    .then((items) => {
      callback(null, items);
    })
    .catch((err) => {
      callback(err);
    })
  },

  addItem(newItem, callback) {
    return Item.create({
      body: newItem.body,
      listId: newItem.listId
    })
    .then((item) => {
      callback(null, item);
    })
    .catch((err) => {
      callback(err);
    })
  },

  checkItem(id, checkedItem, callback){
    return Item.findById(id)
    .then((item) => {
      if(!item){
        return callback("Item not found");
      }

      item.update(checkedItem, {
        isChecked: checkedItem.isChecked
      })
      .then(() => {
        callback(null, item);
      })
      .catch((err) => {
        callback(err);
      });
    });
  },

  updateItem(id, updatedItem, callback){
    return Item.findById(id)
    .then((item) => {
      if(!item){
        return callback("Item not found");
      }

      item.update(updatedItem, {
        body: updatedItem.body
      })
      .then(() => {
        callback(null, item);
      })
      .catch((err) => {
        callback(err);
      });
    });
  },

  deleteItems(ids, callback){
    return Item.destroy({
      where: {id: ids}
    })
    .then((items) => {
      callback(null, items);
    })
    .catch((err) => {
      callback(err);
    })
  }
}
