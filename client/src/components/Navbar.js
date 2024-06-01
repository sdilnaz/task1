
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/SWLogo.png';
import './Navbar.css';

const Navbar = ({ setCategory }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setCategory(category);
    navigate(`/`);
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src={logo} style={{ width: '100px' }} alt="STAR WARS" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => handleCategoryClick('planets')}>PLANETS</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => handleCategoryClick('people')}>PEOPLE</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => handleCategoryClick('starships')}>STARSHIPS</button>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
