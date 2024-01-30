import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink, Navigate } from 'react-router-dom';
import CryptoPrices from './components/CryptoPrices';
import ForexPrices from './components/ForexPrices';


const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <nav className="flex justify-center space-x-4 mb-4">
          <NavLink
            to="/crypto"
            className={({ isActive }) =>
              isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
            }
          >
            Cryptocurrency
          </NavLink>
          <NavLink
            to="/forex"
            className={({ isActive }) =>
              isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
            }
          >
            Forex
          </NavLink>
        </nav>
        <Routes>
          <Route path='/' element = {<Navigate to='/crypto' />} />
          <Route path="/crypto" element={<CryptoPrices />} />
          <Route path="/forex" element={<ForexPrices />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;