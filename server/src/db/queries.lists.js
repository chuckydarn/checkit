const List = require("./models").List;

module.exports = {
  getAllLists(callback){
    return List.all()
    .then((lists) => {
      callback(null, lists);
    })
    .catch((err) => {
      callback(err);
    })
  },

  addList(newList, callback) {
    return List.create({
      name: newList.name
    })
    .then((list) => {
      callback(null, list);
    })
    .catch((err) => {
      callback(err);
    })
  }
}
