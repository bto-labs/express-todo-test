// Tiny Express Todo API — used for mesh-six envbuilder smoke testing.
// Not intended to be production-quality. Stores todos in memory.
const express = require("express");

const app = express();
app.use(express.json());

let nextId = 1;
const todos = new Map();

app.get("/healthz", (_req, res) => res.json({ status: "ok" }));

app.get("/todos", (_req, res) => {
  res.json([...todos.values()]);
});

app.post("/todos", (req, res) => {
  const id = nextId++;
  const todo = { id, title: req.body?.title ?? "", done: false };
  todos.set(id, todo);
  res.status(201).json(todo);
});

app.patch("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.get(id);
  if (!todo) return res.status(404).json({ error: "not found" });
  Object.assign(todo, req.body);
  res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!todos.delete(id)) return res.status(404).json({ error: "not found" });
  res.status(204).end();
});

app.put("/todos/:id/toggle", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.get(id);
  if (!todo) return res.status(404).json({ error: "not found" });
  todo.done = !todo.done;
  res.json(todo);
});

if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => {
    console.log(`express-todo-test listening on :${port}`);
  });
}

module.exports = app;
