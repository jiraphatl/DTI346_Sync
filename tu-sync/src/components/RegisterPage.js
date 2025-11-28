import React, { useState } from 'react';
import './RegisterPage.css';

function RegisterPage({ onSwitchToLogin, onRegisterSuccess, onClose }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // ลบ error เมื่อเริ่มพิมพ์ใหม่
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // ตรวจสอบอีเมล
    if (!formData.email) {
      newErrors.email = 'กรุณากรอกอีเมล';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
    }

    // ตรวจสอบรหัสผ่าน
    if (!formData.password) {
      newErrors.password = 'กรุณากรอกรหัสผ่าน';
    } else if (formData.password.length < 6) {
      newErrors.password = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
    }

    // ตรวจสอบยืนยันรหัสผ่าน
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'กรุณายืนยันรหัสผ่าน';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ทำการสมัครสมาชิก
    console.log('Register:', formData);
    
    // เรียก callback เมื่อสมัครสำเร็จ (ถ้ามี)
    if (onRegisterSuccess) {
      onRegisterSuccess(formData.email);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log('Social login with:', provider);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Handle แถบด้านบน */}
        <div className="modal-handle"></div>
        
        {/* Tabs */}
        <div className="auth-tabs">
          <button className="tab-button active">
            สร้างบัญชี
          </button>
          <button className="tab-button">
            เข้าสู่ระบบ
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* อีเมล */}
          <div className="form-group">
            <label>อีเมล</label>
            <input 
              type="email" 
              name="email"
              placeholder="ตัวอย่าง nameemail@emailkamu.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* รหัสผ่าน */}
          <div className="form-group">
            <label>รหัสผ่าน</label>
            <input 
              type="password" 
              name="password"
              placeholder="••••••••••••"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {/* ยืนยันรหัสผ่าน */}
          <div className="form-group">
            <label>ยืนยันรหัสผ่าน</label>
            <input 
              type="password" 
              name="confirmPassword"
              placeholder="••••••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'error' : ''}
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="submit-button">
            สร้างบัญชี
          </button>

          {/* Divider */}
          <div className="divider-text">หรือสร้างบัญชีด้วย</div>

          {/* Social Login */}
          <div className="social-login">
            <button 
              type="button" 
              className="social-button"
              onClick={() => handleSocialLogin('google')}
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" />
            </button>
            <button 
              type="button" 
              className="social-button"
              onClick={() => handleSocialLogin('teams')}
            >
              <img src="https://www.microsoft.com/favicon.ico" alt="Microsoft" />
            </button>
          </div>

          {/* Link to Login */}
          <div className="switch-text">
            มีบัญชีอยู่แล้ว? <button type="button" className="switch-link" onClick={onSwitchToLogin}>เข้าสู่ระบบ</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;