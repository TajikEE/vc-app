import AuthenticationService from "../app/services/AuthenticationService";
jest.mock("axios");

describe("testing API", () => {
  it("tests the signup parameters", async () => {
    const response = await AuthenticationService.register(
      "Donald",
      "Trump",
      "test@test.com",
      "MakeAmericaGreat"
    );

    expect(response).toEqual({
      message: "User registered successfully!",
    });
  });
});
