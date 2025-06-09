import React from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import PersonForm from './PersonForm';
import Clock from './Clock';
import AxiosApiRest from './AxiosApiRest';
import LoginButton from './LoginButton';
import './styles.css';

export default function NavBar() {
  const location = useLocation();
  const isInActivity2 = location.pathname.startsWith('/actividad2');

  if (!isInActivity2) {
    return <Routes>
      <Route path="*" element={<PersonForm />} />
    </Routes>;
  }

  return (
    <div className="activity-container">
      <nav className="activity-nav">
        <Link to="/actividad2/form" className="activity-link">Formulario</Link>
        <Link to="/actividad2/clock" className="activity-link">Reloj</Link>
        <Link to="/actividad2/axios" className="activity-link">API</Link>
        <Link to="/actividad2/login" className="activity-link">Login</Link>
      </nav>

      <div className="activity-content">
        <Routes>
          <Route path="/form" element={<PersonForm />} />
          <Route path="/clock" element={<Clock />} />
          <Route path="/axios" element={<AxiosApiRest />} />
          <Route path="/login" element={<LoginButton />} />
          <Route path="/" element={<PersonForm />} />
        </Routes>
      </div>
    </div>
  );
} 