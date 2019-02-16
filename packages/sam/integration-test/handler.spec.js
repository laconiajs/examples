const laconiaTest = require("@laconia/test");

describe("handler", () => {
  it("should greet its caller", async () => {
    const greet = laconiaTest("laconia-examples-sam-greet");
    const response = await greet.requestResponse();
    expect(response).toEqual("Hello!");
  });
});
