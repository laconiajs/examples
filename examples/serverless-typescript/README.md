This is an example of how you can use laconia with TypeScript.

These are the key things to notice in this example:

1. Laconia ships with TypeScript declaration file. Have a look into
   `tsconfig.json` that these two settings are enabled to make `import` work in
   TypeScript: `esModuleInterop` and `allowSyntheticDefaultImports`.
2. When some laconia packages are not supporting TypeScript yet, you have to
   declare an empty declaration file. This can be seen configured under
   `typings` directory. This directory is also referred in `tsconfig.json`
3. Notice how the handler is still benefiting from types by the usage of
   `AppDependencies` interface. This dependencies are created by laconia.
