const { FiveOhThreeError, ValidationError } = require("../src/errors");
const upperCaseInstance = require("../src/uppercase");
const app = require("../src/app");
const comparisonHandler = require("../comparison_handler").handler;

describe("handler", () => {
  let event;
  let context;
  let upperCase;

  beforeEach(() => {
    // Minimal API Gateway Event via Lambda-Proxy
    event = {
      queryStringParameters: {}
    };
    // Not really necessary, but you may need to add
    // something down the road. At the very least, it
    // is an empty object IRL.
    context = {};
    upperCase = jest.fn().mockResolvedValue();
  });

  it("should capitalize the `value` query param", async () => {
    const value = " SoMeThInG ";

    // With LaconiaJS
    await expect(app({ value }, upperCaseInstance())).resolves.toEqual({
      value:  " SOMETHING "
    });

    event.queryStringParameters.value = value;

    const expectResponse = {
      body: '{"value":" SOMETHING "}',
      statusCode: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      isBase64Encoded: false
    };

    // Without LaconiaJS
    await expect(comparisonHandler(event, context)).resolves.toEqual(
      expectResponse
    );
  });

  it("should handle a 400 validation error", async () => {
    // With LaconiaJS
    await expect(app({}, upperCaseInstance())).rejects.toBeInstanceOf(
      ValidationError
    );

    const expectResponse = {
      body: "?value= is missing or empty.",
      headers: { "Content-Type": "text/plain" },
      isBase64Encoded: false,
      statusCode: 400
    };
    // Without LaconiaJS
    await expect(comparisonHandler(event, context)).resolves.toEqual(
      expectResponse
    );
  });

  it("should handle a 503 unavailable error", async () => {
    const value = "503error";

    // With LaconiaJS
    await expect(app({ value }, upperCaseInstance())).rejects.toBeInstanceOf(
      FiveOhThreeError
    );

    event.queryStringParameters.value = value;

    const expectResponse = {
      body: "Unsupported.",
      headers: {
        "Content-Type": "text/plain",
        "x-error-class": "FiveOhThreeError"
      },
      isBase64Encoded: false,
      statusCode: 503
    };

    // Without LaconiaJS
    await expect(comparisonHandler(event, context)).resolves.toEqual(
      expectResponse
    );
  });
});
