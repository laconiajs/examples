const laconia = require("@laconia/core");
const AWS = require('aws-sdk');

const NO_CACHE = { cache: { enabled: false } };
const STATUS_OK = { statusCode: 200 };

const newApiGatewayManagement = ({ domainName, stage }) => new AWS.ApiGatewayManagementApi({
  apiVersion: '2018-11-29',
  endpoint: `https://${domainName}/${stage}`
});

const instances = ({ event: { requestContext } }) => {
  const apiGatewayManagement = newApiGatewayManagement(requestContext);
  const ConnectionId = requestContext.connectionId;
  return {
    send: payload => apiGatewayManagement.postToConnection({
      ConnectionId,
      Data: JSON.stringify(payload)
    }).promise()
  };
};

const app = async ({ body }, { send }) => {
  const message = JSON.parse(body);
  if (message) await send(message);
};

exports.message = laconia(app).register(instances, NO_CACHE);

exports.connect = async () => STATUS_OK;
