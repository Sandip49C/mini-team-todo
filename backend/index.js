const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = './todos.json';

// simple persistence helper (file-based)
function readTodos() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}
function writeTodos(todos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
}

// endpoints
app.get('/todos', (req, res) => {
  const todos = readTodos();
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const { text } = req.body;
  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Text required' });
  }
  const todos = readTodos();
  const newTodo = { id: uuidv4(), text: text.trim(), done: false, createdAt: new Date().toISOString() };
  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { text, done } = req.body;
  const todos = readTodos();
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  if (text !== undefined) todos[idx].text = text;
  if (done !== undefined) todos[idx].done = done;
  writeTodos(todos);
  res.json(todos[idx]);
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  let todos = readTodos();
  const before = todos.length;
  todos = todos.filter(t => t.id !== id);
  if (todos.length === before) return res.status(404).json({ error: 'Not found' });
  writeTodos(todos);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
