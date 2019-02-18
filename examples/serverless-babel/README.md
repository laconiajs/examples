This is an example of how you can use laconia in AWS Lambda node 6 runtime with serverless framework.

These are the key things to notice in this example:

1. Laconia is published to only be compatible with node 8. To make it run in node 6,
   `webpack.config.js` has been configured with babel-loader to load laconia.
2. `@babel/transform-runtime` is also required as laconia is written with `async/await`.
