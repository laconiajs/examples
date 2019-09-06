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

const app = require('./src/app')
const instances = require('./src/uppercase')

/**
 * Note: You'll notice a warning from Serverless Offline:
 *
 *    Serverless: Warning: handler 'uppercase' returned a promise and also uses a callback!
 *    This is problematic and might cause issues in your lambda.
 *
 * See the following Github issues:
 * https://github.com/laconiajs/laconia/issues/48
 * https://github.com/laconiajs/laconia/pull/265
 *
 */

exports.handler = laconia(api(app)).register(instances, {
  cache: {
    enabled: !process.env.IS_OFFLINE
  }
});
