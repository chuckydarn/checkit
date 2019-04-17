const request = require("request");
const server = require("../../bin/www");
const base = "http://localhost:9000/users/";
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : users", () => {
  beforeEach((done) => {
    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });
  });

  describe("POST /users", () => {
    it("should create a new user", (done) => {
      const options = {
        url: base,
        form: {
          name: "user",
          email: "user@example.com",
          password: "123456"
        }
      }

      request.post(options,
        (err, res, body) => {
          User.findOne({where: {email: "user@example.com"}})
          .then((user) => {
            expect(user).not.toBeNull();
            expect(user.name).toBe("user");
            expect(user.email).toBe("user@example.com");
            expect(user.id).toBe(1);
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });

    it("should not create a new user with invalid attributes", (done) => {
      request.post(
        {
          url: base,
          form: {
            email: "no",
            password: "123456"
          }
        },
        (err, res, body) => {
          User.findOne({where: {email: "no"}})
          .then((user) => {
            expect(user).toBeNull();
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
});
