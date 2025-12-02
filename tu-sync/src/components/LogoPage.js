import React from 'react';
import './MyLogo.css';

const logo = '/img/logo.png'; // Path อ้างอิงจากโฟลเดอร์ public/

function LandingPage({ onGetStarted }) {
  // ไม่ต้องมี State หรือ useEffect เพื่อทำ Animation แล้ว
  return (
    <div className="landing-page" onClick={onGetStarted}>
      <div className="landing-content">
        
        {/* Logo */}
        <div className="logo-container">
          <img src={logo} alt="Task Manager Logo" className="logo-image" />
        </div>

        {/* Text Group */}
        <div className="text-container">
          <h1 className="app-name">Task Manager</h1>
          <p className="tap-text">แตะหน้าจอเพื่อเริ่มต้น</p>
        </div>

      </div>
    </div>
  );
}

export default LandingPage;