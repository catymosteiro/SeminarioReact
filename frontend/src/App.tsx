import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import Navigation from './components/Navigation';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';
import User from './components/User';
import LibroList from './components/LibroList';
import CreateLibro from './components/CreateBook';
import Libro from './components/Libro';

function App(): JSX.Element {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<UserList/>} />
        <Route path="/edit/:userName" element={<User/>} />
        <Route path="/add" element={<CreateUser/>} />
        <Route path="/Libros" element={<LibroList/>} />
        <Route path="/editlibro/:libroTitle" element={<Libro/>} />
        <Route path="/addLibro" element={<CreateLibro/>} />
      </Routes>
    </Router>
  );
}

export default App;
