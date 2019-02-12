const laconia = require("@laconia/core");
const api = require("@laconia/adapter-api").apigateway({ inputType: "params" });

const instances = () => ({
  operate: input => input.toUpperCase()
});

const app = async ({ message }, { operate }) => {
  return { message: operate(message) };
};

exports.handler = laconia(api(app)).register(instances);
