const request = require("request");
const server = require("../../bin/www");
const base = "http://localhost:9000/items/";
const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const Item = require("../../src/db/models").Item;

describe("routes : items", () => {
  beforeEach((done) => {
    this.list;
    this.item;
    sequelize.sync({force: true}).then((res) => {
      List.create({
        name: "Groceries"
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
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

  describe("GET /items", () => {
    it("should return a status code 200 and all items", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("chicken");
        done();
      });
    });
  });

  describe("POST /items/create", () => {
    const options = {
      url: `${base}create`,
      form: {
        body: "milk",
        listId: 1
      }
    };

    it("should create a new item", (done) => {
      request.post(options,
        (err, res, body) => {
          Item.findOne({where: {body: "milk"}})
          .then((item) => {
            expect(body).toContain("milk");
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });
  });

  describe("POST /items/:id/update", () => {
    it("should update the item with the given values", (done) => {
      const options = {
        url: `${base}1/update`,
        form: {
          body: "coffee"
        }
      };
      request.post(options,
        (err, res, body) => {
          expect(err).toBeNull();
          Item.findOne({
            where: {id: 1}
          })
          .then((item) => {
            expect(item.body).toBe("coffee");
            done();
          });
        }
      );
    });
  });

  describe("POST /items/:id/check", () => {
    it("should update the item with the new checked state", (done) => {
      const options = {
        url: `${base}1/check`,
        form: {
          isChecked: true
        }
      };
      request.post(options,
        (err, res, body) => {
          expect(err).toBeNull();
          Item.findOne({
            where: {id: 1}
          })
          .then((item) => {
            expect(item.isChecked).toBe(true);
            done();
          });
        }
      );
    });
  });

  describe("POST /items/destroy", () => {
    it("should delete the item with the associated id", (done) => {
      const options = {
        url: `${base}destroy`,
        form: {
          id: 1
        }
      };
      Item.all()
      .then((items) => {
        const itemCountBeforeDelete = items.length;
        expect(itemCountBeforeDelete).toBe(1);
        request.post(options, (err, res, body) => {
          Item.all()
          .then((items) => {
            expect(err).toBeNull();
            expect(items.length).toBe(itemCountBeforeDelete - 1);
            done();
          })
        });
      });
    });
  });
});
