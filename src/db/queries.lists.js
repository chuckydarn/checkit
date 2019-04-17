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
      name: newList.name,
      userId: newList.userId
    })
    .then((list) => {
      callback(null, list);
    })
    .catch((err) => {
      callback(err);
    })
  },

  deleteList(id, callback){
    return List.destroy({
      where: {id}
    })
    .then((list) => {
      callback(null, list);
    })
    .catch((err) => {
      callback(err);
    })
  }
}
