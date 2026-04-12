const request = require("supertest");
const app = require("./index");

describe("PUT /todos/:id/toggle", () => {
  let todoId;

  beforeEach(async () => {
    const res = await request(app)
      .post("/todos")
      .send({ title: "test todo" });
    todoId = res.body.id;
  });

  test("toggles done from false to true", async () => {
    const res = await request(app).put(`/todos/${todoId}/toggle`);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: todoId, title: "test todo", done: true });
  });

  test("toggles done from true back to false", async () => {
    await request(app).put(`/todos/${todoId}/toggle`);
    const res = await request(app).put(`/todos/${todoId}/toggle`);
    expect(res.status).toBe(200);
    expect(res.body.done).toBe(false);
  });

  test("returns 404 for a non-existent id", async () => {
    const res = await request(app).put("/todos/99999/toggle");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "not found" });
  });
});
