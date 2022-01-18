import app from "../";
import request from "supertest";

// let apiVersion = "/api/v1";

describe("Server runs", () => {
  test("Should return status 200", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
  });
  it("should return a status of 404", async () => {
    const response = await request(app).get("/garbledygook");
    expect(response.status).toBe(404);
  });

  describe("App routes tests", () => {
    it("should return all inventory items", async () => {
      const res = await request(app).get("/api/v1/inventory/items");
      expect(res.status).toBe(200);
    });

    it("should return error when creating a new inventory item with incomplete body", async () => {
      const res = await request(app).post("/api/v1/inventory", {
        name: "Cargo Ships",
        price: "1200",
        description: "A cargo ship inventory",
        stock: 8,
        location: "Canada",
        totalSold: 3,
      });
      expect(res.status).toBe(422);
    });

    it("should return 409 error when creating a new inventory item with same name", async () => {
      const res = await request(app).post("/api/v1/inventory").send({
        name: "Cargo Ships",
        price: "1200",
        description: "A cargo ship inventory",
        stock: "8",
        location: "Canada",
        totalSold: "3",
        ownerId: "111",
      });
      expect(res.status).toBe(409);
    });
  });
});
