const request = require("supertest");
const { getServerlessApiGatewayUrl } = require("./test-helper");

describe("handler", () => {
  it("should capitalize the `value` query param", async () => {
    const baseUrl = await getServerlessApiGatewayUrl(
      "dev",
      "laconia-examples-serverless-vanilla"
    );
    const response = await request(baseUrl)
      .get("/uppercase?value=hello")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body.value).toEqual("HELLO");
  });
});
