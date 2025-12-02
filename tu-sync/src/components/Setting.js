import React from "react";
import { useNavigate } from "react-router-dom";  // ใช้ navigate จาก react-router-dom
import "./Setting.css";
import FloatingActionMenu from "./FloatingActionMenu";  // อย่าลืม Import ตัวนี้

const Icons = {
  ChevronRight: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>,
  Schedule: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
  Exam: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>,
  Home: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Calendar: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Bell: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  User: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Plus: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
};

function SettingPage({ user, onLogout }) {
  const navigate = useNavigate();  // ใช้ navigate เพื่อเปลี่ยนหน้า

  const menuItems = [
    { icon: <Icons.Schedule />, title: "ตารางเรียน", onClick: () => {} },
    { icon: <Icons.Exam />, title: "ตารางสอบ", onClick: () => {} },
  ];

  const accountSettings = [
    { icon: <Icons.User />, title: "แก้ไขข้อมูลส่วนตัว", onClick: () => {} },
    { icon: <Icons.Exam />, title: "เปลี่ยนรหัสผ่าน", onClick: () => {} },
    { icon: <Icons.Schedule />, title: "ออกจากระบบ", isLogout: true, onClick: () => {
        onLogout();  // เรียกฟังก์ชันออกจากระบบ
        navigate("/"); // เมื่อออกจากระบบแล้วให้กลับไปที่หน้า AuthModal
      }}
  ];

  return (
    <div className="main-container">
      <h1 className="page-title">ตั้งค่า</h1>

      <div className="profile-header">
        <div className="avatar-circle">
          <img src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`} alt="Profile" />
        </div>
        <div className="profile-info">
          <div className="profile-name">{user?.name || "ชื่อผู้ใช้"}</div>
          <div className="profile-email">{user?.email || "email@example.com"}</div>
        </div>
      </div>

      <div className="menu-group-label">การศึกษา</div>
      <div className="menu-card">
        {menuItems.map((item, index) => (
          <div key={index} className="menu-item">
            <div className="menu-icon-box pink-icon">{item.icon}</div>
            <div className="menu-text">{item.title}</div>
            <div className="menu-arrow"><Icons.ChevronRight /></div>
          </div>
        ))}
      </div>

      <div className="menu-group-label">การตั้งค่าบัญชี</div>
      <div className="menu-card">
        {accountSettings.map((item, index) => (
          <div 
            key={index} 
            className={`menu-item ${item.isLogout ? 'logout-item' : ''}`}
            onClick={item.onClick}
          >
            <div className={`menu-icon-box ${item.isLogout ? 'red-icon' : 'pink-icon'}`}>
              {item.icon}
            </div>
            <div className="menu-text">{item.title}</div>
            <div className="menu-arrow"><Icons.ChevronRight /></div>
          </div>
        ))}
      </div>

      <nav className="bottom-nav">
        <div className="nav-wrapper">
          {/* ปุ่ม Home: กลับหน้าหลัก */}
          <button className="nav-item" onClick={() => navigate('/home')}>
            <span className="nav-icon"><Icons.Home /></span>
          </button>
          {/* ปุ่ม Bell: แจ้งเตือน */}
          <button className="nav-item" onClick={() => navigate('/notifications')}>
            <span className="nav-icon"><Icons.Bell /></span>
          </button>
          {/* ปุ่มตรงกลาง (Floating Action Button) */}
          <div className="fab-container">
            <FloatingActionMenu />
          </div>
          {/* ปุ่ม Calendar: ปฏิทิน */}
          <button className="nav-item" onClick={() => navigate('/calendar')}>
            <span className="nav-icon"><Icons.Calendar /></span>
          </button>
          {/* ปุ่ม Profile: (Active เพราะอยู่หน้านี้) */}
          <button className="nav-item active">
            <span className="nav-icon"><Icons.User /></span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default SettingPage;
