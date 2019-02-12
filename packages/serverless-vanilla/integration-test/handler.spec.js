const request = require("supertest");
const { getServerlessApiGatewayUrl } = require("./test-helper");

describe("handler", () => {
  it("should behave as expected", async () => {
    const baseUrl = await getServerlessApiGatewayUrl(
      "dev",
      "laconia-examples-serverless-vanilla"
    );
    const response = await request(baseUrl)
      .get("/hello?message=hello")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body.message).toEqual("HELLO");
  });
});
