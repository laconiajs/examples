const laconia = require("@laconia/core");

const instances = () => ({
  greeter: () => Promise.resolve({ hello: "world" })
});

const app = async (event, { greeter }) => {
  return greeter();
};

exports.handle = laconia(app).register(instances);
