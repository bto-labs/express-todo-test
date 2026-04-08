# express-todo-test

Tiny Express Todo API used as the smoke-test repo for mesh-six envbuilder pods. Not production code.

## Running locally

```sh
npm install
npm start
# GET  /healthz
# GET  /todos
# POST /todos       { "title": "..." }
# PATCH /todos/:id  { "done": true }
# DELETE /todos/:id
```
