const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const Item = require("../../src/db/models").Item;
const User = require("../../src/db/models").User;

describe("Item", () => {
  beforeEach((done) => {
    this.user;
    this.list;
    this.item;
    sequelize.sync({force: true}).then((res) => {
      User.create({
        name: "User",
        email: "user@email.com",
        password: "123456"
      })
      .then((user) => {
        this.user = user;
        List.create({
          name: "Groceries",
          userId: this.user.id
        })
        .then((list) => {
          this.list = list;
          Item.create({
            body: "chicken",
            listId: this.list.id
          })
          .then((item) => {
            this.item = item;
            done();
          });
        })
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

  describe("#create()", () => {
    it("should create an item object", (done) => {
      Item.create({
        body: "milk",
        listId: this.list.id
      })
      .then((item) => {
        expect(item.body).toBe("milk");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create an item with missing body or assigned list", (done) => {
      Item.create({
        body: null
      })
      .then((item) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Item.body cannot be null");
        expect(err.message).toContain("Item.listId cannot be null");
        done();
      })
    });
  });
});
