import React, { useState } from 'react';
import './AboutUS.css';
import Login from './LoginPage';
import Register from './RegisterPage';
import ForgotPassword from './ForgotPasswordPage';

// รูปภาพที่ใช้ในแต่ละหน้า
const images = [
  "/mnt/data/หน้าเริ่ม1.png",
  "/mnt/data/หน้าเริ่ม2.png",
  "/mnt/data/หน้าเริ่ม3.png",
  "/mnt/data/หน้าเริ่ม4.png"
];

function LandingPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [authModal, setAuthModal] = useState(null); // null, 'login', 'register', 'forgot'

  // ฟังก์ชันเปลี่ยนไปหน้าถัดไป
  const handleNextPage = () => {
    if (currentPage < images.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // ฟังก์ชันย้อนกลับหน้าก่อนหน้า
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // ฟังก์ชันเมื่อกดปุ่มเริ่มต้นใช้งาน
  const handleStart = () => {
    setAuthModal('login');
  };

  // ฟังก์ชันปิด modal
  const handleCloseModal = () => {
    setAuthModal(null);
  };

  // กำหนดสีปุ่มตามหน้า
  const getButtonClass = () => {
    return (currentPage === 0 || currentPage === 2) ? 'white-button' : 'pink-button';
  };

  return (
    <div className="landing-page" data-page={currentPage}>
      {/* รูปภาพ */}
      <div className="image-container">
        <img 
          src={images[currentPage]} 
          alt={`Page ${currentPage + 1}`}
          className="image"
        />
      </div>

      {/* Container สำหรับปุ่ม */}
      <div className="button-container">
        {/* ปุ่มย้อนกลับ */}
        {currentPage > 0 && (
          <button
            className={`prev-button ${getButtonClass()}`}
            onClick={handlePrevPage}
          >
            ◀
          </button>
        )}

        {/* ปุ่มเริ่มต้นใช้งาน */}
        {currentPage === 0 && (
          <button
            className="start-button"
            onClick={handleStart}
          >
            เริ่มต้นใช้งาน
          </button>
        )}

        {/* ปุ่มถัดไป */}
        {currentPage < images.length - 1 && (
          <button
            className={`next-button ${getButtonClass()}`}
            onClick={handleNextPage}
          >
            ▶
          </button>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="progress-indicator">
        {images.map((_, index) => (
          <div
            key={index}
            className={`progress-dot ${currentPage === index ? 'active' : 'inactive'}`}
          />
        ))}
      </div>

      {/* Auth Modals */}
      {authModal === 'login' && (
        <Login 
          onClose={handleCloseModal}
          onSwitchToRegister={() => setAuthModal('register')}
          onSwitchToForgot={() => setAuthModal('forgot')}
        />
      )}

      {authModal === 'register' && (
        <Register 
          onClose={handleCloseModal}
          onSwitchToLogin={() => setAuthModal('login')}
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

export default LandingPage;