import React, { useState, useEffect, useMemo } from 'react';
import './AboutUSPage.css';

// ✅ Lazy Loading: โหลด AuthModal เฉพาะเมื่อต้องการใช้งาน
const AuthModal = React.lazy(() => import('./AuthModal'));

// ✅ 1. CDN / Asset Path: เตรียม URL สำหรับ CDN (ถ้ามี) หรือใช้ Local Path
// แนะนำให้เปลี่ยนไฟล์เป็น .webp เพื่อการบีบอัดสูงสุด (Image Compression)
const BASE_PATH = "/img/"; 

function AboutUS({ onLoginSuccess, onRegisterSuccess }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // ✅ 2. Minification & Cache Data: ใช้ useMemo เก็บข้อมูลไว้ไม่ให้สร้างใหม่ทุกครั้งที่ Render
  const slides = useMemo(() => [
    {
      image: `${BASE_PATH}หน้าเริ่ม1.png`, // แนะนำแก้เป็น .webp
      title: "ยินดีต้อนรับสู่",
      highlight: "Task Sync",
      description: "จัดการเวลาและงานของคุณได้อย่างมีประสิทธิภาพ ไม่พลาดทุกกิจกรรมสำคัญในชีวิต"
    },
    {
      image: `${BASE_PATH}หน้าเริ่ม2.png`,
      title: "จัดการตารางงาน",
      highlight: "ได้ง่ายๆ",
      description: "วางแผนชีวิตประจำวัน ตารางเรียน และการสอบ ได้อย่างเป็นระเบียบในที่เดียว"
    },
    {
      image: `${BASE_PATH}หน้าเริ่ม3.png`,
      title: "ไม่พลาดทุก",
      highlight: "การแจ้งเตือน",
      description: "ระบบแจ้งเตือนอัจฉริยะ ที่จะช่วยเตือนคุณก่อนถึงกำหนดการสำคัญเสมอ"
    },
    {
      image: `${BASE_PATH}หน้าเริ่ม4.png`,
      title: "พร้อมหรือยัง?",
      highlight: "เริ่มต้นเลย",
      description: "สมัครสมาชิกวันนี้ เพื่อใช้งานฟีเจอร์ทั้งหมดฟรี! มาเริ่มจัดการชีวิตกันเถอะ"
    }
  ], []);

  // ✅ 3. Smart Preloading (เทคนิค Cache & Lazy Load ผสมกัน)
  // โหลดรูปของหน้า "ถัดไป" รอไว้ใน Cache ของ Browser ทันที
  useEffect(() => {
    if (currentPage < slides.length - 1) {
      const nextImage = new Image();
      nextImage.src = slides[currentPage + 1].image;
    }
  }, [currentPage, slides]);

  const handleNextPage = () => {
    if (currentPage < slides.length - 1) setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(prev => prev - 1);
  };

  // ✅ Handle Authentication Success
  const handleAuthSuccess = (email) => {
    console.log('User authenticated:', email);
    setShowAuthModal(false);
    
    // เรียก callback ที่ส่งมาจาก parent component
    if (onLoginSuccess) {
      onLoginSuccess(email);
    }
    if (onRegisterSuccess) {
      onRegisterSuccess(email);
    }
  };

  return (
    <div className="about-us-container">
      {/* 1. ส่วนแสดงเนื้อหา */}
      <div className="content-wrapper">
        
        {/* รูปภาพกราฟิก */}
        <div className="illustration-container">
          <img 
            src={slides[currentPage].image} 
            alt={`Slide ${currentPage + 1}`} 
            className="slide-image"
            // ✅ 4. Priority Hint: บอก Browser ว่ารูปนี้สำคัญ โหลดด่วน!
            fetchPriority="high"
            loading="eager"
            width="350"
            height="350"
          />
        </div>

        {/* ข้อความ */}
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

      {/* 2. ส่วนปุ่มควบคุม */}
      <div className="button-container">
        {/* ปุ่มย้อนกลับ */}
        <div className="nav-btn-wrapper left">
          {currentPage > 0 && (
            <button className="nav-button prev" onClick={handlePrevPage} aria-label="Previous">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}
        </div>

        {/* ปุ่มกลาง */}
        <div className="center-action">
          {currentPage === 0 ? (
             <button className="start-button" onClick={() => setShowAuthModal(true)}>
               เริ่มต้นใช้งาน
             </button>
          ) : (
            <div className="progress-indicator">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`progress-dot ${currentPage === index ? 'active' : 'inactive'}`}
                  onClick={() => setCurrentPage(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* ปุ่มถัดไป (ขวา) */}
        <div className="nav-btn-wrapper right">
          {currentPage < slides.length - 1 && (
            <button className="nav-button next" onClick={handleNextPage} aria-label="Next">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>
        
      </div>

      {/* Auth Modal - Lazy Loading Component */}
      {showAuthModal && (
        <React.Suspense fallback={<div className="modal-loading" />}>
          <AuthModal 
            onClose={() => setShowAuthModal(false)} 
            onAuthSuccess={handleAuthSuccess}
          />
        </React.Suspense>
      )}
    </div>
  );
}

// ✅ 5. React Memo: ป้องกันการ Re-render หน้าทั้งหมดโดยไม่จำเป็น
export default React.memo(AboutUS);