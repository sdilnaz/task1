import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

const App = () => {
  const [category, setCategory] = useState('planets');

  return (
    <Router>
      <Navbar setCategory={setCategory} />
      <Routes>
        <Route path="/" element={<Home category={category} />} />
      </Routes>
    </Router>
  );
};

export default App;
