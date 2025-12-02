import React, { useEffect, useState } from 'react';
import './AuthModal.css';
import ForgotPasswordPage from './ForgotPasswordPage';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

// ✅ Minified SVG Icons
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <g transform="matrix(1,0,0,1,27.009,-39.239)">
      <path fill="#4285F4" d="M-3.264 51.509c0-.79-.07-1.54-.19-2.27h-11.3v4.62h6.47c-.29 1.68-1.16 3.1-2.46 4l3.9 3.33c2.28-2.1 3.58-5.2 3.58-9.68Z" />
      <path fill="#34A853" d="M-14.754 63.239c3.24 0 5.95-1.08 7.91-2.89l-3.9-3.33c-1.07.71-2.43 1.15-4.01 1.15-3.13 0-5.78-2.12-6.73-4.97h-3.77v2.92c1.93 3.83 5.91 7.12 10.5 7.12Z" />
      <path fill="#FBBC05" d="M-21.484 53.199a7.388 7.388 0 0 1 0-4.72v-2.92h-3.77a12.6 12.6 0 0 0 0 10.56l3.77-2.92Z" />
      <path fill="#EA4335" d="M-14.754 43.499c1.77 0 3.35.61 4.6 1.81l3.22-3.22c-2.03-1.9-4.58-2.85-7.82-2.85-4.59 0-8.57 3.29-10.5 7.12l3.77 2.92c.95-2.85 3.6-5.78 6.73-5.78Z" />
    </g>
  </svg>
);

const TeamsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" fill="#5059C9" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 7.5A1.5 1.5 0 0 1 3.5 6h8v12h-8A1.5 1.5 0 0 1 2 16.5v-9Zm10.5-1.5h8A1.5 1.5 0 0 1 22 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-8V6Z"
      fill="#5059C9"
    />
  </svg>
);

function AuthModal({ onClose, onAuthSuccess, onSwitchToForgotPassword }) {
  const [isLogin, setIsLogin] = useState(false); // เริ่มต้นที่หน้าสร้างบัญชีตามรูป
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user && onAuthSuccess) onAuthSuccess(user.email); // pass email string
    });
    return () => unsub();
  }, [onAuthSuccess]);

  const switchTab = (loginState) => {
    if (isLogin === loginState) return;
    setErrors({});
    setIsAnimating(true);
    setTimeout(() => {
      setIsLogin(loginState);
      setIsAnimating(false);
    }, 150);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!isLogin && !formData.username) newErrors.username = 'กรุณากรอกชื่อผู้ใช้';
    if (!formData.email) newErrors.email = 'กรุณากรอกอีเมล';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
    if (!isLogin && formData.phone && !/^\d{10}$/.test(formData.phone)) newErrors.phone = 'หมายเลขโทรศัพท์ไม่ถูกต้อง';
    if (!formData.password) newErrors.password = 'กรุณากรอกรหัสผ่าน';
    else if (formData.password.length < 6) newErrors.password = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
    if (!isLogin && formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      }
      const email = auth.currentUser?.email || formData.email;
      if (onAuthSuccess && email) onAuthSuccess(email); // pass email string
      if (onClose) onClose();
    } catch (err) {
      setErrors({ form: err.message || 'เข้าสู่ระบบไม่สำเร็จ' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotClick = () => {
    if (onSwitchToForgotPassword) onSwitchToForgotPassword();
    else setIsForgotPassword(true);
  };

  const handleBackToLoginFromForgot = () => setIsForgotPassword(false);

  const handleSignOut = async () => {
    await signOut(auth);
    if (onClose) onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-handle"></div>

        {isForgotPassword ? (
          <ForgotPasswordPage onSwitchToLogin={handleBackToLoginFromForgot} onClose={onClose} />
        ) : (
          <>
            <div className="auth-tabs">
              <button className={`tab-button ${!isLogin ? 'active' : ''}`} onClick={() => switchTab(false)} type="button">
                สร้างบัญชี
              </button>
              <button className={`tab-button ${isLogin ? 'active' : ''}`} onClick={() => switchTab(true)} type="button">
                เข้าสู่ระบบ
              </button>
            </div>

            <form className={`auth-form ${isAnimating ? 'fade' : ''}`} onSubmit={handleSubmit}>
              <div className="input-group">
                {!isLogin && (
                  <div className="form-item">
                    <label htmlFor="username">ชื่อผู้ใช้</label>
                    <input
                      id="username"
                      type="text"
                      name="username"
                      placeholder="ชื่อผู้ใช้"
                      value={formData.username}
                      onChange={handleChange}
                      className={errors.username ? 'error' : ''}
                    />
                    {errors.username && <span className="error-text">{errors.username}</span>}
                  </div>
                )}

                <div className="form-item">
                  <label htmlFor="email">อีเมล</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="ตัวอย่าง name@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                    autoComplete="username"
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                {!isLogin && (
                  <div className="form-item">
                    <label htmlFor="phone">หมายเลขโทรศัพท์</label>
                    <input
                      id="phone"
                      type="text"
                      name="phone"
                      placeholder="หมายเลขโทรศัพท์"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? 'error' : ''}
                    />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>
                )}

                <div className="form-item">
                  <label htmlFor="password">รหัสผ่าน</label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? 'error' : ''}
                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                  />
                  {errors.password && <span className="error-text">{errors.password}</span>}
                </div>

                {!isLogin && (
                  <div className="form-item">
                    <label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</label>
                    <input
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      placeholder="••••••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={errors.confirmPassword ? 'error' : ''}
                      autoComplete="new-password"
                    />
                    {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                  </div>
                )}
              </div>

              {isLogin && (
                <div className="forgot-password-container" onClick={handleForgotClick}>
                  <span className="forgot-text">ลืมรหัสผ่าน?</span>
                </div>
              )}

              {errors.form && <div className="form-error">{errors.form}</div>}

              <button type="submit" className="submit-button" disabled={submitting}>
                {submitting ? 'โปรดรอ...' : isLogin ? 'เข้าสู่ระบบ' : 'สร้างบัญชี'}
              </button>

              <div className="divider-line"></div>

              <div className="social-login-container">
                <button type="button" className="social-btn" aria-label="Sign in with Google">
                  <GoogleIcon />
                </button>
                <button type="button" className="social-btn" aria-label="Sign in with Microsoft Teams">
                  <TeamsIcon />
                </button>
                <button type="button" className="social-btn" onClick={handleSignOut} aria-label="Sign out">
                  ออกจากระบบ
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default React.memo(AuthModal);
