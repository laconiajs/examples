const handler = require("../handler").handler;
const comparisonHandler = require("../comparison_handler").handler;

describe("handler", () => {
  let event;
  let context;

  beforeEach(() => {
    // Minimal API Gateway Event via Lambda-Proxy
    event = {
      queryStringParameters: {}
    };
    // Not really necessary, but you may need to add
    // something down the road. At the very least, it
    // is an empty object IRL.
    context = {};
  });

  it("should capitalize the `value` query param", async () => {
    event.queryStringParameters.value = " SoMeThInG ";

    const expectResponse = {
      body: '{"value":" SOMETHING "}',
      statusCode: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      isBase64Encoded: false
    };

    // With LaconiaJS
    await expect(handler(event, context)).resolves.toEqual(expectResponse);

    // Without LaconiaJS
    await expect(comparisonHandler(event, context)).resolves.toEqual(
      expectResponse
    );
  });

  it("should handle a 400 validation error", async () => {
    const expectResponse = {
      body: "?value= is missing or empty.",
      headers: { "Content-Type": "text/plain" },
      isBase64Encoded: false,
      statusCode: 400
    };
    // With LaconiaJS
    await expect(handler(event, context)).resolves.toEqual(expectResponse);

    // Without LaconiaJS
    await expect(comparisonHandler(event, context)).resolves.toEqual(
      expectResponse
    );
  });

  it("should handle a 503 unavailable error", async () => {
    event.queryStringParameters.value = "503error";

    const expectResponse = {
      body: "Unsupported.",
      headers: {
        "Content-Type": "text/plain",
        "x-error-class": "FiveOhThreeError"
      },
      isBase64Encoded: false,
      statusCode: 503
    };

    // With LaconiaJS
    await expect(handler(event, context)).resolves.toEqual(expectResponse);

    // Without LaconiaJS
    await expect(comparisonHandler(event, context)).resolves.toEqual(
      expectResponse
    );
  });
});
