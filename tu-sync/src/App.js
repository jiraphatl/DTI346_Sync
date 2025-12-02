import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Components
import LogoPage from './components/LogoPage';
import AboutUS from './components/AboutUSPage';
import HomePage from './components/HomePage';

function App() {
  const [user, setUser] = useState(null);
  const [showLogo, setShowLogo] = useState(true);

  // ฟังก์ชันจำลองการ Login
  const handleLogin = (email) => {
    // ในสถานการณ์จริงอาจรับ Object user มาจาก API
    const username = email.split('@')[0];
    setUser({ username, email, name: username }); // Set User เพื่อให้ Route ทำงาน
  };

  const handleLogout = () => {
    setUser(null);
    setShowLogo(true);
  };

  return (
    <Router>
      <Routes>
        {/* Route: หน้าแรก (Landing) */}
        <Route 
          path="/" 
          element={
            user ? (
              // ✅ 1. ถ้า Login แล้ว ให้เด้งไปหน้า Home ทันที
              <Navigate to="/home" replace />
            ) : showLogo ? (
              <LogoPage onGetStarted={() => setShowLogo(false)} />
            ) : (
              <AboutUS 
                onLoginSuccess={handleLogin}
                onRegisterSuccess={handleLogin}
              />
            )
          } 
        />
        
        {/* Route: หน้าหลัก (Protected) */}
        <Route 
          path="/home" 
          element={
            user ? (
              // ✅ 2. แสดง HomePage และส่ง user prop เข้าไป
              <HomePage user={user} onLogout={handleLogout} />
            ) : (
              // ถ้ายังไม่ login ให้ดีดกลับไปหน้าแรก
              <Navigate to="/" replace />
            )
          } 
        />

        {/* Redirect เส้นทางอื่นๆ กลับหน้าแรก */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;