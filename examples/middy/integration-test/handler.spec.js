const laconiaTest = require("@laconia/test");

const lambdaName = "laconia-examples-middy-dev-exclaim";
const MIDDY_ERROR_MESSAGE = "Event object failed validation";

describe("handler", () => {
  it("should shout back to its caller", async () => {
    const exclaim = laconiaTest(lambdaName);
    const response = await exclaim.requestResponse({ message: "hello" });
    expect(response).toEqual("HELLO!");
  });

  it("should return an error when the event specified does not satisfy the lambda's schema", async () => {
    const exclaim = laconiaTest(lambdaName);
    await expect(exclaim.requestResponse({ foo: "bar" })).rejects.toThrow(
      MIDDY_ERROR_MESSAGE
    );
  });
});
