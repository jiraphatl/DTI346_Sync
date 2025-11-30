import React from 'react';
import './Setting.css';
import FloatingActionMenu from "./FloatingActionMenu";

function Setting({ user, onLogout }) {
  // ====== ฟังก์ชันของเรา สำหรับเมนู 3 ปุ่ม ======
  const handleCreateOnlineMeeting = () => {
    alert("สร้างนัดหมายออนไลน์");
    // ภายหลังถ้าอยากให้พาไปหน้า form ก็เปลี่ยนจาก alert เป็น navigation ได้
  };

  const handleCreateEvent = () => {
    alert("สร้างกิจกรรมใหม่");
  };

  const handleAddAssignment = () => {
    alert("เพิ่มงานที่ต้องส่ง");
  };

  // ====== ของเพื่อน (คงไว้เหมือนเดิม) ======
  const menuItems = [
    {
      icon: '📅',
      title: 'ตารางเรียน',
      onClick: () => console.log('ตารางเรียน')
    },
    {
      icon: '📊',
      title: 'ตารางสอบ',
      onClick: () => console.log('ตารางสอบ')
    },
    {
      icon: '📚',
      title: 'ปฏิทินการศึกษา',
      onClick: () => console.log('ปฏิทินการศึกษา')
    },
    {
      icon: '🔔',
      title: 'การตั้งค่าการแจ้งเตือน',
      onClick: () => console.log('การแจ้งเตือน')
    },
    {
      icon: '🔄',
      title: 'เปลี่ยนบัญชี',
      onClick: () => console.log('เปลี่ยนบัญชี')
    },
    {
      icon: '🚪',
      title: 'ออกจากระบบ',
      onClick: onLogout
    }
  ];

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header">
        <h1>โปรไฟล์ของฉัน</h1>
      </div>

      {/* User Info Card */}
      <div className="user-card">
        <div className="user-avatar">
          <div className="avatar-circle">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <circle cx="30" cy="30" r="30" fill="#4A5568"/>
              <circle cx="30" cy="23" r="10" fill="white"/>
              <path d="M10 50C10 41 18 35 30 35C42 35 50 41 50 50" fill="white"/>
            </svg>
          </div>
        </div>
        <div className="user-info">
          <h2 className="user-name">{user?.username || 'ผู้ใช้'}</h2>
          <p className="user-email">{user?.email || 'email@example.com'}</p>
        </div>

        {/* Microsoft Teams Connection */}
        <div className="microsoft-card">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg"
            alt="Teams"
            className="teams-icon"
          />
          <span className="teams-text">เชื่อมต่อ Microsoft Teams</span>
        </div>
      </div>

      {/* Menu Section - Personal Data */}
      <div className="menu-section">
        <div className="section-header">
          <span className="star-icon">⭐</span>
          <span className="section-title">ข้อมูลส่วนตัว</span>
        </div>
        <div className="menu-list">
          {menuItems.slice(0, 3).map((item, index) => (
            <div key={index} className="menu-item" onClick={item.onClick}>
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-title">{item.title}</span>
              <span className="menu-arrow">›</span>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Section - System Settings */}
      <div className="menu-section">
        <div className="section-header">
          <span className="star-icon">⭐</span>
          <span className="section-title">การตั้งค่าระบบ</span>
        </div>
        <div className="menu-list-alt">
          {menuItems.slice(3).map((item, index) => (
            <div key={index} className="menu-item-alt" onClick={item.onClick}>
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-title">{item.title}</span>
              <span className="menu-arrow">›</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <button className="nav-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
        </button>
        <button className="nav-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
        </button>
        <button className="nav-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <rect x="4" y="4" width="7" height="7"/>
            <rect x="4" y="13" width="7" height="7"/>
            <rect x="13" y="4" width="7" height="7"/>
            <rect x="13" y="13" width="7" height="7"/>
          </svg>
        </button>
        <button className="nav-btn active">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </button>
      </div>

      {/* ปุ่มบวก + เมนูลอย 3 ปุ่ม */}
      <FloatingActionMenu
        onCreateOnlineMeeting={handleCreateOnlineMeeting}
        onCreateEvent={handleCreateEvent}
        onAddAssignment={handleAddAssignment}
      />

      {/* ปุ่ม Add เดิมของเพื่อน (เก็บไว้เฉย ๆ เผื่ออยากเอากลับมาใช้) */}
      {/*
      <button className="add-btn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
      </button>
      */}
    </div>
  );
}

export default Setting;
