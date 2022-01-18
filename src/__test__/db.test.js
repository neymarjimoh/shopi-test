import DbModule from "../api/config/db";

const filename = "inventory.json";
const wrongFilename = "db.json";

// const myMockFn = jest.fn(cb => cb(null, true));

describe("Database Test", () => {
  it("should return true when file is present", async () => {
    const data = await DbModule.checkFileExists(filename);
    expect(data).toBeTruthy();
  });

  it("should return false when file is present", async () => {
    expect.assertions(1);
    try {
      const data = await DbModule.checkFileExists(wrongFilename);
      expect(data).toBeFalsy();
    } catch (e) {
      expect(e).toMatch("error");
    }
  });
});
