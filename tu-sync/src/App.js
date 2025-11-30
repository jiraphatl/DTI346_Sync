import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LogoPage from './components/LogoPage';
import AboutUS from './components/AboutUSPage';
import ProfilePage from './components/Setting';

// ✅ ใช้อันนี้ เพราะไฟล์อยู่ใน /src/components/HomePage.js
import HomePage from './components/HomePage';


function App() {
  const [user, setUser] = useState(null);
  const [showLogo, setShowLogo] = useState(true);

  // state เก็บงาน + event สำหรับ HomePage
  const [userData, setUserData] = useState({
    tasks: [],
    events: [],
  });

  const handleGetStarted = () => {
    setShowLogo(false);
  };

  const handleLogin = (email) => {
    const username = email.split('@')[0];
    setUser({ username, email });
  };

  const handleLogout = () => {
    setUser(null);
    setShowLogo(true);
    setUserData({ tasks: [], events: [] }); // เคลียร์ข้อมูลหน้าหลักถ้าต้องการ
  };

  return (
    <Router>
      <Routes>
        {/* หน้าแรก / หลังล็อกอินให้เด้งไป /home */}
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/home" replace />
            ) : showLogo ? (
              <LogoPage onGetStarted={handleGetStarted} />
            ) : (
              <AboutUS
                onLoginSuccess={handleLogin}
                onRegisterSuccess={handleLogin}
              />
            )
          }
        />

        {/* ✅ หน้าหลัก (HomePage) */}
        <Route
          path="/home"
          element={
            user ? (
              <HomePage
                user={user}
                userData={userData}
                onLogout={handleLogout}
                onUpdateUserData={setUserData}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* หน้าโปรไฟล์ / setting เดิม ยังใช้ได้ */}
        <Route
          path="/profile"
          element={
            user ? (
              <ProfilePage user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* route อื่นให้เด้งกลับหน้าแรก */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
