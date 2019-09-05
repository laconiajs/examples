const laconia = require("@laconia/core");
const api = require("@laconia/adapter-api").apigateway({
  inputType: "params",
  errorMappings: new Map([
    ["Validation.*", () => ({ statusCode: 400 })],
    [
      "FiveOhThreeError",
      () => ({
        statusCode: 503,
        headers: { "x-error-class": "FiveOhThreeError" }
      })
    ]
  ])
});
const callbackConverter = require("./src/callback-converter");
const { FiveOhThreeError, ValidationError } = require("./src/errors");

const instances = () => ({
  upperCase: input => input.toUpperCase()
});

const app = async ({ value }, { upperCase }) => {
  const input = value;
  // You'll see this in the AWS logs
  console.info("passed input", input);
  if (!input) {
    throw new ValidationError("?value= is missing or empty.");
  }

  if (input === "503error") {
    throw new FiveOhThreeError();
  }

  return { value: await upperCase(input) };
};

exports.handler = callbackConverter(
  laconia(api(app)).register(instances, {
    cache: {
      enabled: !process.env.IS_OFFLINE
    }
  })
);
