import React, { useEffect, useState } from 'react';
import API from '../api';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  async function load() {
    const res = await API.get('/todos');
    setTodos(res.data);
  }
  useEffect(() => { load(); }, []);

  async function addTodo(e) {
    e.preventDefault();
    if (!text.trim()) return;
    const res = await API.post('/todos', { text });
    setTodos(prev => [...prev, res.data]);
    setText('');
  }

  async function toggleDone(id, done) {
    await API.put(`/todos/${id}`, { done: !done });
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !done } : t));
  }

  async function removeTodo(id) {
    await API.delete(`/todos/${id}`);
    setTodos(prev => prev.filter(t => t.id !== id));
  }

  return (
    <div>
      <form onSubmit={addTodo} style={{ marginBottom: 12 }}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Add todo" style={{ padding: 8, width: '70%' }} />
        <button style={{ padding: 8, marginLeft: 8 }}>Add</button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(t => (
          <li key={t.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
            <input type="checkbox" checked={t.done} onChange={() => toggleDone(t.id, t.done)} />
            <span style={{ marginLeft: 8, textDecoration: t.done ? 'line-through' : 'none', flex: 1 }}>{t.text}</span>
            <button onClick={() => removeTodo(t.id)} style={{ marginLeft: 8 }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
