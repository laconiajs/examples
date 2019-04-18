const middy = require("middy");
const { validator } = require("middy/middlewares");
const laconia = require("@laconia/core");

const instances = () => ({
  exclaim: input => `${input.toUpperCase()}!`
});

const app = async ({ message }, { exclaim }) => {
  return exclaim(message);
};

const handler = laconia(app).register(instances);

exports.exclaim = middy(handler).use(
  validator({
    inputSchema: {
      required: ["message"],
      properties: {
        message: {
          type: "string"
        }
      }
    }
  })
);
