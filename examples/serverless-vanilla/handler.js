const laconia = require("@laconia/core");
const api = require("@laconia/adapter-api").apigateway({ inputType: "params" });
const callbackConverter = require("./src/callback-converter");

const instances = () => ({
  upperCase: input => input.toUpperCase()
});

const app = async ({ value }, { upperCase }) => {
  return { value: await upperCase(value) };
};

exports.handler = callbackConverter(laconia(api(app)).register(instances));
