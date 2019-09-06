
const { FiveOhThreeError, ValidationError } = require("./errors");

const app = async ({ value }, { upperCase }) => {
  // You'll see this in the AWS logs
  console.info("passed input", value);
  if (!value) {
    throw new ValidationError("?value= is missing or empty.");
  }

  if (value === "503error") {
    throw new FiveOhThreeError();
  }

  return { value: await upperCase(value) };
};

module.exports = app;
