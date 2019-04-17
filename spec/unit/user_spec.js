const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;

describe("User", () => {
  beforeEach((done) => {
    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      done();
    });
  });

  describe("#create()", () => {
    it("should create a user", (done) => {
      User.create({
        email: "user@example.com",
        password: "123456"
      })
      .then((user) => {
        expect(user.email).toBe("user@example.com");
        expect(user.id).toBe(1);
        done();
      })
      .catch((err) => {
        done();
      });
    });

    it("should not create a user with invalid email or password", (done) => {
      User.create({
        email: "not an email",
        password: "123456"
      })
      .then((user) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Validation error");
        done();
      });
    });

    it("should not create a user with an email already taken", (done) => {
      User.create({
        email: "user@example.com",
        password: "123456"
      })
      .then((user) => {
        User.create({
          email: "user@example.com",
          password: "654321"
        })
        .then((user) => {
          done();
        })
        .catch((err) => {
          expect(err.message).toContain("Validation error");
          done();
        });
        done();
      })
      .catch((err) => {
        done();
      });
    });
  });
});
