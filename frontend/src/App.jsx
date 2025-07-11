import { useState, useEffect } from 'react';
import axios from 'axios';

// ✅ Use environment variable
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get(API_URL).then(res => setTodos(res.data));
  }, []);

  const addTodo = () => {
    if (!text.trim()) return;

    axios.post(API_URL, { text }).then(res => {
      setTodos([...todos, res.data]);
      setText('');
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
    <div>
      <h1>Todo List</h1>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <span
              onClick={() => toggleTodo(todo._id)}
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

