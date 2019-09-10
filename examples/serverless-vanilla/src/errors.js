// credit: https://rclayton.silvrback.com/custom-errors-in-node-js
class ValidationError extends Error {
  constructor(message) {
    super(message);
    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;
    // This clips the constructor invocation from the stack trace.
    // It's not absolutely essential, but it does make the stack trace a little nicer.
    Error.captureStackTrace(this, this.constructor);
  }
}

class FiveOhThreeError extends Error {
  constructor() {
    super("Unsupported.");

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  FiveOhThreeError,
  ValidationError
};
