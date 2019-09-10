/**
 * Here is an example how you could accomplish the same thing
 * without using LaconiaJS as in `handler.js`
 */

const Services = {
  async upperCase(input) {
    return input.toUpperCase();
  }
};

// Note: We aren't doing anything with context,
// but this is the recommended lambda function
// signature

// This is an example of a raw event:
// https://serverless.com/framework/docs/providers/aws/events/apigateway/#example-lambda-proxy-event-default
module.exports.handler = async (event, context) => {
  const params = Object.assign(
    {},
    event.queryStringParameters,
    event.pathParameters
  );
  const value = params.value;

  // You'll see this in the AWS logs
  console.info("passed input", value);
  if (!value) {
    return {
      statusCode: 400,
      body: "?value= is missing or empty.",
      headers: {
        "Content-Type": "text/plain"
      },
      isBase64Encoded: false
    };
  }

  if (value === "503error") {
    return {
      statusCode: 503,
      body: "Unsupported.",
      headers: {
        "Content-Type": "text/plain",
        "x-error-class": "FiveOhThreeError"
      },
      isBase64Encoded: false
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      value: await Services.upperCase(value)
    }),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    isBase64Encoded: false
  };
};
