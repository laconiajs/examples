const converter = require("../src/callback-converter");

describe("callback-converter", () => {
  let laconiaHandler;

  beforeAll(() => {
    laconiaHandler = jest.fn((event, context, callback) => {
      event === "good" ? callback(null, "yay") : callback(new Error("nay"));
    });
  });

  test("resolution", async () => {
    await expect(converter(laconiaHandler)("good")).resolves.toBe("yay");
  });

  test("rejection", async () => {
    await expect(converter(laconiaHandler)("bad")).rejects.toThrow("nay");
  });
});
