import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AboutUS from './components/AboutUS';

function App() {
  return (
    <Router>
      <Routes>  {/* ใช้ <Routes> แทน <Switch> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/aboutus" element={<AboutUS />} />
      </Routes>
    </Router>
  );
}

export default App;
