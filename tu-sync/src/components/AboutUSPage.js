import React, { useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import './AboutUSPage.css';

const AuthModal = React.lazy(() => import('./AuthModal'));

const AboutUS = ({ onLoginSuccess, onRegisterSuccess }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const slides = useMemo(
    () => [
      {
        title: 'จัดระเบียบงานและเรียนรู้ได้ง่าย',
        highlight: 'TU-Sync',
        description: 'แพลตฟอร์มช่วยจัดการตารางงาน การบ้าน และการแจ้งเตือนให้ครบถ้วน',
      },
      {
        title: 'ทำงานร่วมกันได้ลื่นไหล',
        highlight: 'ทีมเวิร์กดีกว่า',
        description: 'แชร์งาน ติดตามสถานะ และแจ้งเตือนเพื่อนร่วมทีมแบบเรียลไทม์',
      },
      {
        title: 'โฟกัสในสิ่งสำคัญ',
        highlight: 'แจ้งเตือนตรงเวลา',
        description: 'รวมการแจ้งเตือนจากทุกงาน ทุกวิชา ไว้ที่เดียว ไม่พลาดเดดไลน์',
      },
      {
        title: 'เริ่มต้นง่าย ปรับแต่งได้',
        highlight: 'พร้อมใช้งาน',
        description: 'ปรับตารางงาน ใส่หมวดหมู่ และเชื่อมกับกิจกรรมของคุณในไม่กี่คลิก',
      },
    ],
    []
  );

  useEffect(() => {
    if (currentPage < slides.length - 1) {
      const nextImage = new Image();
      nextImage.src = slides[currentPage + 1].image;
    }
  }, [currentPage, slides]);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, slides.length - 1));
  }, [slides.length]);

  const handlePrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleAuthSuccess = useCallback(
    (email) => {
      setShowAuthModal(false);
      if (onLoginSuccess) onLoginSuccess(email);
      if (onRegisterSuccess) onRegisterSuccess(email);
    },
    [onLoginSuccess, onRegisterSuccess]
  );

  return (
    <div className="about-us-container">
      <div className="content-wrapper">
          
        <div className="text-content">
          <h1 className="slide-title">
            {slides[currentPage].title}
            <br />
            <span className="slide-highlight">{slides[currentPage].highlight}</span>
          </h1>
          <p className="slide-description">{slides[currentPage].description}</p>
        </div>
      </div>

      <div className="button-container">
        <div className="nav-btn-wrapper left">
          {currentPage > 0 && (
            <button className="nav-button prev" onClick={handlePrevPage} aria-label="Previous">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}
        </div>

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

      {showAuthModal && (
        <Suspense fallback={<div className="modal-loading" />}>
          <AuthModal onClose={() => setShowAuthModal(false)} onAuthSuccess={handleAuthSuccess} />
        </Suspense>
      )}
    </div>
  );
};

export default React.memo(AboutUS);
