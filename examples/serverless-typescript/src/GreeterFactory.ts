import Greeter from "./Greeter";

export const createSimpleGreeter: () => Greeter = () => () =>
  Promise.resolve("Hello!");
