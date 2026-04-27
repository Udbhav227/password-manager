const request = require("supertest");
const app = require("../app");

describe("Authentication Routes", () => {
  it("should block registration if data is missing", async () => {
    const response = await request(app).post("/api/register").send({
      username: "testuser",
    });

    expect(response.statusCode).not.toBe(201);
  });
});
