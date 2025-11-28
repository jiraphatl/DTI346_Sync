import React from 'react';
import { useNavigate } from 'react-router-dom';  // ใช้ useNavigate แทน useHistory
import './LandingPage.css';
import logo from '../img/logo.png';

function LandingPage() {
  const navigate = useNavigate();  // สร้าง instance ของ navigate

  // ฟังก์ชันที่ใช้เมื่อคลิกหน้าจอ
  const handleClick = () => {
    navigate('/aboutus');  // เปลี่ยนเส้นทางไปยังหน้าถัดไป
  };

  return (
    <div className="landing-page" onClick={handleClick}>
      <img src={logo} alt="Logo" className="logo" />
    </div>
  );
}

export default LandingPage;
