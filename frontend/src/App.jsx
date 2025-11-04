import React from 'react';
import TodoList from './components/TodoList';

export default function App() {
  return (
    <div style={{ maxWidth: 700, margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Mini Team To-Do</h1>
      <TodoList />
    </div>
  );
}
