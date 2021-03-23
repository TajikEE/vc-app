const controller = require("./auth.controller");
const jwt = require("jsonwebtoken");
jest.mock("jsonwebtoken");
jwt.sign.mockReturnValue("token");

jest.mock("../models/user.model.js", () => () => {
  const SequelizeMock = require("sequelize-mock");
  const dbMock = new SequelizeMock();
  return dbMock.define("users", {
    id: 2,
    email: "xyz@abc.com",
    firstname: "Mart",
    lastname: "Helme",
    password: "Ekreislife",
    createdAt: "2021-03-22T21:24:08.148Z",
    updatedAt: "2021-03-22T21:24:08.148Z",
  });
});

describe("signup functionality", () => {
  it("mocks user creation and returns response", async () => {
    const result = await controller.createUserInDb({
      email: "xyz@abc.com",
      firstname: "Mart",
      lastname: "Helme",
      password: "Ekreislife",
    });
    expect(result).toEqual({ message: "User registered successfully!" });
  });
});

describe("login functionality", () => {
  it("mocks the db to find a user", async () => {
    const result = await controller.findUserInDb({
      email: "xyz@abc.com",
    });
    expect(result).toEqual({
      id: 2,
      email: "xyz@abc.com",
      firstname: "Mart",
      lastname: "Helme",
      password: "Ekreislife",
      createdAt: "2021-03-22T21:24:08.148Z",
      updatedAt: "2021-03-22T21:24:08.148Z",
    });
  });
  it("bcryptCompare fails due to different password", async () => {
    const result = await controller.bcryptCompare({
      password: "Ilikecats",
      savedPassword: "Ekreislife",
    });
    expect(result).toEqual(false);
  });
});
