import React, { useReducer, createContext, useContext } from "react";
import './TodoApp.css';

const initialTodos = [
  {
    id: 1,
    text: "Aprender React Router",
    completed: true,
    author: "Faby",
    due: "2024-03-20"
  },
  {
    id: 2,
    text: "Practicar useReducer",
    completed: false,
    author: "Alex",
    due: "2024-03-25"
  }
];

function appReducer(state, action) {
  switch (action.type) {
    case "add": {
      return [
        ...state,
        {
          id: Date.now(),
          text: "",
          author: "",
          due: new Date().toISOString().split('T')[0],
          completed: false
        }
      ];
    }
    case "delete": {
      return state.filter((item) => item.id !== action.payload);
    }
    case "completed": {
      return state.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            completed: !item.completed
          };
        }
        return item;
      });
    }
    case "update": {
      const { id, field, value } = action.payload;
      return state.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            [field]: value
          };
        }
        return item;
      });
    }
    case "reset": {
      return initialTodos;
    }
    default: {
      return state;
    }
  }
}

const TodoContext = createContext();

export default function TodoApp() {
  const [todos, dispatch] = useReducer(appReducer, initialTodos);

  return (
    <TodoContext.Provider value={dispatch}>
      <div className="todo-app-container">
        <h2 className="todo-app-header">Lista de Tareas</h2>
        <div className="todo-app-buttons">
          <button onClick={() => dispatch({ type: "add" })} className="btn-primary">
            Crear Tarea
          </button>
          <button onClick={() => dispatch({ type: "reset" })} className="btn-secondary">
            Reiniciar Lista
          </button>
        </div>
        <TodosList items={todos} />
      </div>
    </TodoContext.Provider>
  );
}

function TodosList({ items }) {
  if (items.length === 0) {
    return <p className="no-todos">No hay tareas. ¡Crea una nueva!</p>;
  }
  return (
    <div className="todos-list">
      {items.map((item) => (
        <TodoItem key={item.id} {...item} />
      ))}
    </div>
  );
}

function TodoItem({ id, completed, author, text, due }) {
  const dispatch = useContext(TodoContext);

  const handleUpdate = (field, value) => {
    dispatch({
      type: "update",
      payload: {
        id,
        field,
        value
      }
    });
  };

  return (
    <div className={`todo-item ${completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch({ type: "completed", payload: id })}
        className="todo-checkbox"
      />
      <input
        type="text"
        value={text}
        placeholder="Descripción de la tarea"
        onChange={(e) => handleUpdate("text", e.target.value)}
        className="todo-input"
      />
      <input
        type="text"
        value={author}
        placeholder="Autor"
        onChange={(e) => handleUpdate("author", e.target.value)}
        className="todo-input"
      />
      <input
        type="date"
        value={due}
        onChange={(e) => handleUpdate("due", e.target.value)}
        className="todo-date"
      />
      <button
        className="delete-button"
        onClick={() => dispatch({ type: "delete", payload: id })}
      >
        Eliminar
      </button>
    </div>
  );
}