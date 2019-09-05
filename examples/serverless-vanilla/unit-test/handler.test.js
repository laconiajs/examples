const handler = require("../handler").handler;

describe("handler", () => {
  it("should capitalize the `value` query param", async () => {
    const event = {
      queryStringParameters: {
        value: " SoMeThInG "
      }
    };

    // Not necessary
    const context = {};

    await expect(handler(event, context)).resolves.toEqual({
      body: '{"value":" SOMETHING "}',
      statusCode: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      isBase64Encoded: false
    });
  });

  it("should handle errors automatically with adapter-api", async () => {
    await expect(handler({}, {})).resolves.toEqual({
      body: "Cannot read property 'toUpperCase' of undefined",
      headers: { "Content-Type": "text/plain" },
      isBase64Encoded: false,
      statusCode: 500
    });
  });
});
