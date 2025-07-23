import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Styling

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    axios.get(API_URL).then(res => setTodos(res.data));
  }, []);

  const addTodo = () => {
    if (!text.trim()) return;

    axios.post(API_URL, {
      text,
      priority,
      dueDate
    }).then(res => {
      setTodos([...todos, res.data]);
      setText('');
      setPriority('medium');
      setDueDate('');
    });
  };

  const toggleTodo = (id) => {
    axios.put(`${API_URL}/${id}`).then(res => {
      setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
    });
  };

  const deleteTodo = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      setTodos(todos.filter(todo => todo._id !== id));
    });
  };

  return (
    <div id="root">
      <h1>📝 Todo List</h1>

      <form className="todo-form" onSubmit={(e) => { e.preventDefault(); addTodo(); }}>
        <input
          type="text"
          placeholder="Enter todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="high">🔥 High</option>
          <option value="medium">⭐ Medium</option>
          <option value="low">🧊 Low</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map(todo => (
          <li key={todo._id} className="todo-item">
            <div
              className={`todo-text ${todo.completed ? 'completed' : ''}`}
              onClick={() => toggleTodo(todo._id)}
            >
              {todo.text}
            </div>
            <div className="todo-meta">
              📅 {todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : 'No date'} | 🚦 {todo.priority}
            </div>
            <div className="todo-buttons">
              <button onClick={() => deleteTodo(todo._id)}>🗑</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
