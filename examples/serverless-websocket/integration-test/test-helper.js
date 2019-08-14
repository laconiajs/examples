const WebSocketClient = require('websocket').client;
const AWS = require("aws-sdk");

const getServerlessApiGatewayUrl = async (
  serverlessStage,
  serverlessServiceName
) => {
  const apig = new AWS.ApiGatewayV2();
  const restApis = await apig.getApis().promise();

  const restApiName = `${serverlessStage}-${serverlessServiceName}`;
  const restApi = restApis.Items.find(i => i.Name === restApiName);
  if (!restApi) {
    throw new Error(`${restApiName} could not be found!`);
  }
  return `wss://${
    restApi.ApiId
    }.execute-api.eu-west-1.amazonaws.com/${serverlessStage}`;
};

const getWebSocketConnection = async baseUrl => new Promise(
  async (resolve, reject) => new WebSocketClient()
    .on('connect', resolve)
    .on('connectFailed', reject)
    .connect(await baseUrl)
);

const getMessage = async (connection, timeout) => new Promise(
  (resolve, reject) => {
    const timer = timeout && setTimeout(() => reject(new Error("Timeout")), timeout);

    connection.on('message', message => {
      timeout && clearTimeout(timer);
      resolve(JSON.parse(message.utf8Data));
    });
  }
);

module.exports = { getServerlessApiGatewayUrl, getWebSocketConnection, getMessage };
