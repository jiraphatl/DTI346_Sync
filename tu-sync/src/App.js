import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LogoPage from './components/LogoPage';
import AboutUS from './components/AboutUSPage'; // ✅ เรียกไฟล์ใหม่ถูกต้อง
import ProfilePage from './components/Setting'; // ✅ ต้องมั่นใจว่าไฟล์ชื่อ Setting.js นะครับ

function App() {
  const [user, setUser] = useState(null);
  const [showLogo, setShowLogo] = useState(true);

  const handleGetStarted = () => {
    setShowLogo(false);
  };

  const handleLogin = (email) => {
    const username = email.split('@')[0];
    // ✅ แค่ Set User ก็พอ React จะรู้เองว่าต้องเปลี่ยนหน้า (ดูใน return ด้านล่าง)
    setUser({ username, email });
  };

  const handleLogout = () => {
    setUser(null);
    setShowLogo(true);
    // ไม่ต้องใช้ window.location.href
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            // ✅ เพิ่ม Logic: ถ้ามี User แล้ว ให้เด้งไปหน้า Profile เลย
            user ? (
              <Navigate to="/profile" replace />
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
        
        <Route 
          path="/profile" 
          element={
            // เช็คว่ามี user ไหม? ถ้ามีแสดง ProfilePage(Setting) ถ้าไม่มีเด้งกลับหน้าแรก
            user ? <ProfilePage user={user} onLogout={handleLogout} /> : <Navigate to="/" />
          } 
        />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;