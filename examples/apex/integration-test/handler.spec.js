const laconiaTest = require("@laconia/test");

const lambdaName = "laconia-examples-apex_greet";

describe("handler", () => {
  it("should greet to its caller", async () => {
    const greet = laconiaTest(lambdaName);
    const response = await greet.requestResponse();
    expect(response).toEqual({ hello: "world" });
  });
});
