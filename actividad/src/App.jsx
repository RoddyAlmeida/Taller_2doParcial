import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { UserProvider } from './actividad2/contexts/UserContext';
import BookList from './actividad1/booklist';
import NavBar from './actividad2/NavBar';
import TodoApp from './actividad 3/TodoApp';
import ChartsDashboard from './actividad4/ChartsDashboard';
import Todos from './actividad5/TodoGrid';
import './App.css';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="app">
          <nav className="main-nav">
            <h1>Actividades de React</h1>
            <div className="nav-links">
              <Link to="/actividad1">Actividad 1</Link>
              <Link to="/actividad2">Actividad 2</Link>
              <Link to="/actividad3">Actividad 3</Link>
              <Link to="/actividad4">Actividad 4</Link>
              <Link to="/actividad5">Actividad 5</Link>
            </div>
          </nav>

          <main className="main-content">
            <Routes>
              <Route path="/" element={<BookList />} />
              <Route path="/actividad1" element={<BookList />} />
              <Route path="/actividad2/*" element={<NavBar />} />
              <Route path="/actividad3" element={<TodoApp />} />
              <Route path="/actividad4" element={<ChartsDashboard />} />
              <Route path="/actividad5" element={<Todos />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
