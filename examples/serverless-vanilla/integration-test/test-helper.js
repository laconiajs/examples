const AWS = require("aws-sdk");

const getServerlessApiGatewayUrl = async (
  serverlessStage,
  serverlessServiceName
) => {
  const apig = new AWS.APIGateway();
  const restApis = await apig.getRestApis().promise();
  const restApiName = `${serverlessStage}-${serverlessServiceName}`;
  const restApi = restApis.items.find(i => i.name === restApiName);
  if (!restApi) {
    throw new Error(`${restApiName} could not be found!`);
  }
  return `https://${
    restApi.id
  }.execute-api.eu-west-1.amazonaws.com/${serverlessStage}`;
};

module.exports = { getServerlessApiGatewayUrl };
