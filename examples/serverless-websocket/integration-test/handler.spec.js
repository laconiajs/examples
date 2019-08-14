const { getServerlessApiGatewayUrl, getWebSocketConnection, getMessage } = require("./test-helper");

describe("handler", () => {

  const MSG_TIMEOUT = 987;

  it("should behave as expected", async () => {
    const baseUrl = await getServerlessApiGatewayUrl(
      "dev",
      "laconia-examples-serverless-websocket-websockets"
    );
    const connection = await getWebSocketConnection(baseUrl);
    try {
      connection.send(JSON.stringify("HELLO"));
      const message = await getMessage(connection, MSG_TIMEOUT);
      expect(message).toEqual("HELLO");
    } finally {
      connection.close();
    }
  });
});
