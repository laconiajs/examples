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

As you can see, the query parameter `value` maps to the `{ value }` argument in the `app` function in [handler.js](handler.js#L8). 

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
npm run test:cloud
```
