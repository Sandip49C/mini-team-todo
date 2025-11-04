const request = require('supertest');
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.resolve(__dirname, '../todos.json');
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fsExtra = require('fs');

app.use(cors());
app.use(bodyParser.json());

// tiny copy of endpoints for test: to avoid requiring the main server file which listens
function readTodos() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return [];
  }
}
function writeTodos(todos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
}
app.get('/todos', (req, res) => res.json(readTodos()));
app.post('/todos', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text required' });
  const todos = readTodos();
  const newTodo = { id: uuidv4(), text, done: false, createdAt: new Date().toISOString() };
  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
});

let server;
beforeAll(() => {
  server = app.listen(0);
});
afterAll(() => server.close());

test('GET /todos returns array', async () => {
  const res = await request(server).get('/todos');
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

test('POST /todos 201 with valid body', async () => {
  const res = await request(server).post('/todos').send({ text: 'test item' });
  expect(res.status).toBe(201);
  expect(res.body.text).toBe('test item');
});
