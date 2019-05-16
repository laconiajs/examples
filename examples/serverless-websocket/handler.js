const laconia = require("@laconia/core");
const { res } = require("@laconia/event").apigateway;
const AWS = require('aws-sdk');

const instances = () => ({
  getSendHandler: (requestContext) => {
    const client = new AWS.ApiGatewayManagementApi({
      apiVersion: '2018-11-29',
      endpoint: `https://${requestContext.domainName}/${requestContext.stage}`
    });
    return async (connection, payload) => client.postToConnection({
      ConnectionId: connection,
      Data: JSON.stringify(payload, null, 2)
    })
      .promise();
  }
});

const app = async ({ body, requestContext }, { getSendHandler }) => {
  const send = getSendHandler(requestContext);
  if (body.answer) await send(requestContext.connectionId, { answer: body.answer });
  return "success";
};

const adapter = app => async (event, context) => {
  try {
    const body = JSON.parse(event.body);
    const output = await app({ ...event, body }, context);
    return res(output);
  } catch (err) {
    console.log(err.message);
    return res(err.message, 500);
  }
};

exports.handler = laconia(adapter(app)).register(instances);