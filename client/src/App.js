// import React from 'react'
// import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import Home from './pages/Home'
// import Navbar from './components/Navbar';


// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Navbar setCategory={setCategory} />
//         <div className='pages'>
//           <Routes>
//             <Route path = "/" element = {<Home/>} />
//           </Routes>
//         </div>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

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
