import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li>
      <span
        onClick={() => onToggle(todo._id)}
        style={{
          cursor: 'pointer',
          textDecoration: todo.completed ? 'line-through' : 'none',
          marginRight: '10px'
        }}
      >
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo._id)}>Delete</button>
    </li>
  );
};

export default TodoItem;

