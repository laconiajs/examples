export const createSimpleGreeter: () => Greeter = () => () =>
  Promise.resolve("Hello!");
