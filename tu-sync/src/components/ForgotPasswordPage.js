import React, { useState } from 'react';
import './ForgotPasswordPage.css';

function ForgotPasswordPage({ onSwitchToLogin, onClose }) {
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // ส่งอีเมลรีเซ็ตรหัสผ่าน
    console.log('Reset password for:', email);
    setShowSuccess(true);
  };

  const handleResend = () => {
    // ส่งอีเมลอีกครั้ง
    console.log('Resend email to:', email);
  };

  const handleBackToLogin = () => {
    setShowSuccess(false);
    setEmail('');
    if (onSwitchToLogin) {
      onSwitchToLogin();
    }
  };

  if (showSuccess) {
    return (
      <div className="forgot-password-page">
        <div className="success-container">
          <div className="success-icon">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="40" fill="#4CAF50"/>
              <path d="M22 40L34 52L58 28" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <h1 className="success-title">ทำรายการสำเร็จ</h1>
          
          <p className="success-subtitle">
            กรุณาตรวจสอบอีเมลของคุณเพื่อ<br />
            สร้างรหัสผ่านใหม่
          </p>

          <p className="resend-text">
            ไม่ได้รับอีเมล? <button className="resend-link" onClick={handleResend}>ส่งอีกครั้ง</button>
          </p>

          <button 
            className="back-button"
            onClick={handleBackToLogin}
          >
            กลับไปหน้าเข้าสู่ระบบ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="forgot-password-page">
      <div className="forgot-content">
        <h1 className="page-title">ลืมรหัสผ่าน</h1>
        <p className="page-subtitle">ใส่อีเมลของคุณในช่านล่าง</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>อีเมล</label>
            <input 
              type="email" 
              placeholder="ตัวอย่าง nameemail@emailkamu.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <p className="note-text">
              จากนั้นคุณสามารถ <button type="button" className="switch-link" onClick={handleBackToLogin}>ลงชื่อเข้าใช้</button>
          </p>

          <button type="submit" className="submit-button">
            ค้านับการต่อ
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;