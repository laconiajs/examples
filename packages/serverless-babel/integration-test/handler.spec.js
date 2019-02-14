const laconiaTest = require("@laconia/test");

describe("handler", () => {
  it("should greet its caller", async () => {
    const greet = laconiaTest("laconia-examples-serverless-babel-dev-greet");
    const response = await greet.requestResponse();
    expect(response).toEqual("Hello!");
  });
});
