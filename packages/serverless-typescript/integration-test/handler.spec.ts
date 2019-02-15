import laconiaTest from "@laconia/test";

describe("handler", () => {
  it("should greet its caller", async () => {
    const greet = laconiaTest(
      "laconia-examples-serverless-typescript-dev-greet"
    );
    const response = await greet.requestResponse();
    expect(response).toEqual("Hello!");
  });
});
