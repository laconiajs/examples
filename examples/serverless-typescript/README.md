This is an example of how you can use laconia with TypeScript.

These are the key things to notice in this example:

1. TypeScript strict mode is enabled, hence implicit any is not allowed.
   As laconia is not supporting TypeScript yet at the moment, it will clash with the strict mode.
   To make laconia works in TypeScript strict mode, you have to declare an empty declaration file
   for laconia. This can be seen configured under `typings` directory. This directory is also
   referred in tsconfig.json
2. Even though laconia is not supporting TypeScript at the moment, notice how the handler is still
   benefiting from types by the usage of `AppDependencies` interface. This dependencies are created
   by laconia.
