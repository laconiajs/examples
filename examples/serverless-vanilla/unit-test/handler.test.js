const handler = require("../handler").handler;

describe("handler", () => {
  it("should capitalize the `value` query param", done => {
    const event = {
      queryStringParameters: {
        value: " SoMeThInG "
      }
    };

    // Not necessary
    const context = {};

    handler(event, context, (error, result) => {
      expect(error).toBe(null);
      expect(result).toEqual({
        body: '{"value":" SOMETHING "}',
        statusCode: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        isBase64Encoded: false
      });
      done();
    });
  });
});
