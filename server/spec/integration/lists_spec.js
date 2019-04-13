const request = require("request");
const server = require("../../bin/www");
const base = "http://localhost:9000/lists/";
const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;

describe("routes : lists", () => {

  beforeEach((done) => {
    this.list;
    sequelize.sync({force: true}).then((res) => {
      List.create({
        name: "Groceries"
      })
      .then((list) => {
        this.list = list;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

  describe("GET /lists", () => {
    it("should return a status code 200 and all lists", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("Groceries");
        done();
      });
    });
  });

  describe("POST /lists/create", () => {
    const options = {
      url: `${base}create`,
      form: {
        name: "Target"
      }
    };

    it("should create a new list", (done) => {
      request.post(options,
        (err, res, body) => {
          List.findOne({where: {name: "Target"}})
          .then((list) => {
            expect(body).toContain("Target");
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

  describe("POST /lists/:id/destroy", () => {
     it("should delete the list with the associated ID", (done) => {
       List.all()
       .then((lists) => {
         const listCountBeforeDelete = lists.length;
         expect(listCountBeforeDelete).toBe(1);
         request.post(`${base}${this.list.id}/destroy`, (err, res, body) => {
           List.all()
           .then((lists) => {
             expect(err).toBeNull();
             expect(lists.length).toBe(listCountBeforeDelete - 1);
             done();
           })
         });
       });
     });
   });
});
