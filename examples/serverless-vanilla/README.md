# Serverless Vanilla Example
This is an example usage of laconia with serverless framework.

## Serverless Offline
For a very quick demo, just run:
```bash
npx sls offline
```

Then in another terminal run:
```bash
curl localhost:3000/uppercase/?value=blah
```
or
```bash
curl localhost:3000/comparison/uppercase/blah
```

As you can see, the query parameter and the path paramter `value` maps to the `{ value }` argument in the `app` function in [handler.js](handler.js#L29). All this magic works using `@laconia/adapter-api`.

## Comparison with and without LaconiaJS
You can compare [using Laconia](handler.js) to [not using it](comparison_handler.js). Keep in mind this is a pretty simple example meant to show how things map from the raw Lambda inputs and get processed.

## Example Unit Testing
In this example, we use [Jest](https://jestjs.io/).

Simply run:
```bash
npm test
```

## Example Integration Testing (i.e Live deployment)
For integration testing, we actually deploy the service, so make sure your AWS credentials are set up. After the test we remove the service.

Run:
```bash
## Optional if you don't want to default eu-west-1
export AWS_REGION=us-east-1
npm run cloud-test
```
