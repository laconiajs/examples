const laconia = require("@laconia/core");

const instances = () => ({
  greeter: () => Promise.resolve("Hello!")
});

const app = async (event, { greeter }) => {
  return greeter();
};

export default laconia(app).register(instances);
