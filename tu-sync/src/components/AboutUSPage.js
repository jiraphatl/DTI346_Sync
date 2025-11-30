import React, { useState } from 'react';
import './AboutUSPage.css';
import Login from './LoginPage';
import Register from './RegisterPage';
import ForgotPassword from './ForgotPasswordPage';

// ✅ ข้อมูลของแต่ละหน้า (แก้ไขข้อความได้ที่นี่)
const slides = [
  {
    image: "/img/หน้าเริ่ม1.png", // เปลี่ยนเป็น path รูปกราฟิกของคุณ
    title: "ยินดีต้อนรับสู่",
    highlight: "Task Sync",
    description: "จัดการเวลาและงานของคุณได้อย่างมีประสิทธิภาพ ไม่พลาดทุกกิจกรรมสำคัญในชีวิต"
  },
  {
    image: "/img/หน้าเริ่ม2.png",
    title: "จัดการตารางงาน",
    highlight: "ได้ง่ายๆ",
    description: "วางแผนชีวิตประจำวัน ตารางเรียน และการสอบ ได้อย่างเป็นระเบียบในที่เดียว"
  },
  {
    image: "/img/หน้าเริ่ม3.png",
    title: "ไม่พลาดทุก",
    highlight: "การแจ้งเตือน",
    description: "ระบบแจ้งเตือนอัจฉริยะ ที่จะช่วยเตือนคุณก่อนถึงกำหนดการสำคัญเสมอ"
  },
  {
    image: "/img/หน้าเริ่ม4.png",
    title: "พร้อมหรือยัง?",
    highlight: "เริ่มต้นเลย",
    description: "สมัครสมาชิกวันนี้ เพื่อใช้งานฟีเจอร์ทั้งหมดฟรี! มาเริ่มจัดการชีวิตกันเถอะ"
  }
];

function AboutUS({ onLoginSuccess, onRegisterSuccess }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [authModal, setAuthModal] = useState(null);

  const handleNextPage = () => {
    if (currentPage < slides.length - 1) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleStart = () => {
    setAuthModal('login');
  };

  const handleCloseModal = () => {
    setAuthModal(null);
  };

  // กำหนดสีปุ่มตามหน้า (ปรับให้เป็น Theme เดียวกัน)
  const isLastPage = currentPage === slides.length - 1;

  return (
    <div className="about-us-container">
      {/* 1. ส่วนแสดงเนื้อหา (Text & Image) */}
      <div className="content-wrapper">
        
        {/* รูปภาพกราฟิก */}
        <div className="illustration-container">
          <img 
            src={slides[currentPage].image} 
            alt={`Slide ${currentPage + 1}`} 
            className="slide-image"
          />
        </div>

        {/* ข้อความ (Text Code) */}
        <div className="text-content">
          <h1 className="slide-title">
            {slides[currentPage].title} <br />
            <span className="slide-highlight">{slides[currentPage].highlight}</span>
          </h1>
          <p className="slide-description">
            {slides[currentPage].description}
          </p>
        </div>

      </div>

      {/* 2. ส่วนปุ่มควบคุม (Navigation) */}
      <div className="button-container">
        {/* ปุ่มย้อนกลับ */}
        <div className="nav-btn-wrapper left">
          {currentPage > 0 && (
            <button className="nav-button prev" onClick={handlePrevPage}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}
        </div>

        {/* Indicator หรือ ปุ่ม Start */}
        <div className="center-action">
          {currentPage === 0 ? (
             <button className="start-button" onClick={handleStart}>
               เริ่มต้นใช้งาน
             </button>
          ) : (
            <div className="progress-indicator">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`progress-dot ${currentPage === index ? 'active' : 'inactive'}`}
                  onClick={() => setCurrentPage(index)} // กดที่จุดเพื่อเปลี่ยนหน้าได้
                />
              ))}
            </div>
          )}
        </div>

        {/* ปุ่มถัดไป */}
        <div className="nav-btn-wrapper right">
          {currentPage < slides.length - 1 ? (
            <button className="nav-button next" onClick={handleNextPage}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ) : (
             // ✅ เปลี่ยนปุ่มหน้าสุดท้ายเป็นอันนี้ครับ
                <button className="final-cta-button" onClick={handleStart}>
                  <span>ลุยเลย!</span>
                  {/* ไอคอนจรวด 🚀 แบบ SVG เพื่อความคมชัด */}
                  <svg width="20" height="20" viewBox="0 0 28 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                  </svg>
                </button>
          )}
        </div>
      </div>

      {/* Auth Modals (คงเดิม) */}
      {authModal === 'login' && (
        <Login 
          onClose={handleCloseModal}
          onSwitchToRegister={() => setAuthModal('register')}
          onSwitchToForgot={() => setAuthModal('forgot')}
          onLoginSuccess={onLoginSuccess}
        />
      )}
      {authModal === 'register' && (
        <Register 
          onClose={handleCloseModal}
          onSwitchToLogin={() => setAuthModal('login')}
          onRegisterSuccess={onRegisterSuccess}
        />
      )}
      {authModal === 'forgot' && (
        <ForgotPassword 
          onClose={handleCloseModal}
          onSwitchToLogin={() => setAuthModal('login')}
        />
      )}
    </div>
  );
}

export default AboutUS;