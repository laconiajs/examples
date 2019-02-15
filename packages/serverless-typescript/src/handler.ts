import { Handler } from "aws-lambda";
import laconia from "@laconia/core";
import { createSimpleGreeter } from "./GreeterFactory";

const instances = () => ({
  greeter: createSimpleGreeter()
});

const app = async (_: any, { greeter }: AppDependencies) => {
  return greeter();
};

export const greet: Handler = laconia(app).register(instances);
