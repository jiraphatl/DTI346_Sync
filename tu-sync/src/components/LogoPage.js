import React, { useEffect, useState } from 'react';
import './MyLogo.css';
const logo = '/img/logo.png'; // Path อ้างอิงจากโฟลเดอร์ public/
function LandingPage({ onGetStarted }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleStart = () => {
  onGetStarted();  // เรียกฟังก์ชัน onGetStarted ที่ได้รับจากพ่อ (App.js)
  };

  return (
    <div className={`landing-page ${isVisible ? 'visible' : ''}`} onClick={onGetStarted}>
      <div className="landing-container">
        <div className="landing-content">
          {/* Logo */}
          <div className="landing-logo">
            <img src={logo} alt="Logo" className="logo-image" />
          </div>

          {/* Title */}
          <h1 className="landing-title">
            ยินดีต้อนรับสู่<br />
            <span className="highlight">Task Manager</span>
          </h1>

          {/* Subtitle */}
          <p className="landing-subtitle">
            จัดการเวลาและงานของคุณได้อย่างมีประสิทธิภาพ<br />
            ไม่พลาดทุกกิจกรรมสำคัญ
          </p>

          {/* Features */}
          <div className="features-list">
            <div className="feature-item">
              <div className="feature-icon">📅</div>
              <span>จัดการตารางงาน</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✅</div>
              <span>ติดตามความคืบหน้า</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔔</div>
              <span>แจ้งเตือนอัตโนมัติ</span>
            </div>
          </div>

          {/* Tap to continue */}
          <div className="tap-to-continue" onClick={handleStart}>
            <p>แตะเพื่อเริ่มต้นใช้งาน</p>
            <div className="tap-indicator">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="decorative-circle circle-1"></div>
        <div className="decorative-circle circle-2"></div>
        <div className="decorative-circle circle-3"></div>
      </div>
    </div>
  );
}

export default LandingPage;