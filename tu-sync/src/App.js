import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Components
import LogoPage from './components/LogoPage';
import AboutUS from './components/AboutUSPage';
import HomePage from './components/HomePage';
import Setting from './components/Setting';
import CalendarPage from './components/CalendarPage';
import NotificationsPage from './components/NotificationsPage'; // 1. เพิ่มบรรทัดนี้
import { DataProvider } from './DataContext'; // 1. Import ไฟล์ที่เพิ่งสร้าง (เช็ค path ให้ถูกนะครับ)

function App() {
  const [user, setUser] = useState(null);
  const [showLogo, setShowLogo] = useState(true);

  // ฟังก์ชันจำลองการ Login
  const handleLogin = (email) => {
    const username = email.split('@')[0];
    setUser({ username, email, name: username });
  };

  const handleLogout = () => {
    setUser(null);
    setShowLogo(true);
  };

  return (
    <DataProvider>
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            user ? (
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
        
        <Route 
          path="/home" 
          element={
            user ? (
              <HomePage user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />

        <Route 
          path="/settings" 
          element={
            user ? (
              <Setting user={user} onLogout={handleLogout} /> 
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />

        <Route 
          path="/calendar" 
          element={
            user ? (
              <CalendarPage user={user} onLogout={handleLogout} /> 
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />

        {/* 2. เพิ่ม Route สำหรับหน้าแจ้งเตือน ตรงนี้ครับ */}
        <Route 
          path="/notifications" 
          element={
            user ? (
              <NotificationsPage /> 
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
    </DataProvider>
  );
}

export default App;