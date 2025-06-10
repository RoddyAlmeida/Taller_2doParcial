import React, { useState, useEffect, useContext } from "react";
import "./TodoGrid.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const ApiContext = React.createContext();
const API_URL = "https://6847798aec44b9f3493d2e4c.mockapi.io/todo";
const useApiContext = () => useContext(ApiContext);

const CreateTodo = () => {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [due, setDue] = useState("");
  const { addTodo } = useApiContext();

  const handleAddTodo = () => {
    if (!text.trim()) return;
    
    addTodo({
      id: uuidv4(),
      text,
      author,
      due,
      completed: false
    });

    setText("");
    setAuthor("");
    setDue("");
  };

  return (
    <div className="create-todo-form">
      <div className="form-card">
        <h2>Crear "Todo"</h2>
        <div className="form-field">
          <label>Tarea</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ingrese el texto de la tarea"
          />
        </div>
        <div className="form-field">
          <label>Autor</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Ingrese el nombre del autor"
          />
        </div>
        <div className="form-field">
          <label>Fecha de vencimiento</label>
          <input
            type="date"
            value={due}
            onChange={(e) => setDue(e.target.value)}
          />
        </div>
        <hr />
        <button className="btn btn-primary" onClick={handleAddTodo}>
          <span className="icon">+</span>
          Agregar Tarea
        </button>
      </div>
    </div>
  );
};

const UpdateTodo = ({ todo }) => {
  const { updateTodo } = useApiContext();

  const handleUpdateTodo = () => {
    updateTodo(todo.id);
  };

  return (
    <div className="todo-checkbox">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleUpdateTodo}
        id={`todo-${todo.id}`}
      />
      <label htmlFor={`todo-${todo.id}`}>
        {todo.completed ? "Completado" : "Marcar como completado"}
      </label>
    </div>
  );
};

const ReadTodos = () => {
  const { todos } = useApiContext();

  return (
    <div className="todos-grid">
      {todos && todos.map((todo) => (
        <div key={todo.id} className="todo-card">
          <div className="todo-content">
            <h3 className={todo.completed ? "completed-todo" : ""}>
              {todo.text}
            </h3>
            <p className="meta">Autor: {todo.author}</p>
            <p className="description">
              Fecha de vencimiento: {todo.due ? new Date(todo.due).toLocaleDateString() : "No hay fecha de vencimiento"}
            </p>
            <hr />
            <UpdateTodo todo={todo} />
          </div>
          <div className="todo-actions">
            <DeleteTodo todo={todo} />
          </div>
        </div>
      ))}
    </div>
  );
};

const DeleteTodo = ({ todo }) => {
  const { deleteTodo } = useApiContext();

  const handleDeleteTodo = () => {
    deleteTodo(todo.id);
  };

  return (
    <button className="btn btn-danger" onClick={handleDeleteTodo}>
      <span className="icon">🗑</span>
      Eliminar
    </button>
  );
};

const Todos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data || []);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setTodos([]);
    }
  };

  const addTodo = async (newTodo) => {
    try {
      const response = await axios.post(API_URL, newTodo);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const updateTodo = async (id) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
      
      await axios.put(`${API_URL}/${id}`, updatedTodo);
      
      setTodos(todos.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <ApiContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo }}>
      <div className="todos-container">
        <h1>Lista de Tareas</h1>
        <CreateTodo />
        <hr />
        <ReadTodos />
      </div>
    </ApiContext.Provider>
  );
};

export default Todos; 