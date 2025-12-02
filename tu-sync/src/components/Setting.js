import React from 'react';
import './Setting.css';

// ✅ ชุดไอคอน SVG ที่วาดตามแบบในรูป (ใช้ Inline SVG เพื่อลดการโหลดไฟล์)
const Icons = {
  Schedule: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
  Exam: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>,
  Calendar: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path></svg>,
  Bell: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
  Lock: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>,
  Globe: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>,
  Switch: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>,
  Shield: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
  Logout: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>,
  ChevronRight: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>,
  UserAvatar: () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
  // Nav Icons
  NavHome: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
  NavBell: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
  NavCalendar: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
  NavUser: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
  Plus: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
};

function Setting({ user, onLogout }) {
  const usageData = [
    { icon: <Icons.Schedule />, title: 'ตารางเรียน' },
    { icon: <Icons.Exam />, title: 'ตารางสอบ' },
    { icon: <Icons.Calendar />, title: 'ปฏิทินการศึกษา' },
  ];

  const accountSettings = [
    { icon: <Icons.Bell />, title: 'การตั้งค่าการแจ้งเตือน' },
    { icon: <Icons.Lock />, title: 'เปลี่ยนรหัสผ่าน' },
    { icon: <Icons.Globe />, title: 'การตั้งค่าภาษา' },
    { icon: <Icons.Switch />, title: 'สลับบัญชีผู้ใช้' },
    { icon: <Icons.Shield />, title: 'คำถามที่พบบ่อย (FAQ)' },
    { icon: <Icons.Logout />, title: 'ออกจากระบบ', onClick: onLogout, isLogout: true },
  ];

  return (
    <div className="main-container">
      <h1 className="page-title">โปรไฟล์ของฉัน</h1>

      {/* ส่วนข้อมูลผู้ใช้ */}
      <div className="profile-header">
        <div className="avatar-circle">
          <Icons.UserAvatar />
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{user?.username || 'jiraphat.luef'}</h2>
          <p className="profile-email">@{user?.email?.split('@')[0] || 'jiraphat.luef'}</p>
          <button className="edit-btn">
             ✏️ แก้ไขข้อมูลส่วนตัว
          </button>
        </div>
      </div>

      {/* กลุ่มเมนู 1: ข้อมูลการใช้งาน */}
      <div className="menu-group-label">ข้อมูลการใช้งาน</div>
      <div className="menu-card">
        {usageData.map((item, index) => (
          <div key={index} className="menu-item">
            <div className="menu-icon-box pink-icon">{item.icon}</div>
            <div className="menu-text">{item.title}</div>
            <div className="menu-arrow"><Icons.ChevronRight /></div>
          </div>
        ))}
      </div>

      {/* กลุ่มเมนู 2: การตั้งค่าบัญชี */}
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

      {/* ปุ่ม + (FAB) */}
      <button className="fab-button">
        <Icons.Plus />
      </button>

      {/* แถบเมนูล่าง (Floating Nav) */}
      <div className="bottom-nav-pill">
        <button className="nav-item">
          <Icons.NavHome />
        </button>
        <button className="nav-item">
          <Icons.NavBell />
        </button>
        <button className="nav-item">
          <Icons.NavCalendar />
        </button>
        <button className="nav-item active">
          <Icons.NavUser />
        </button>
      </div>
    </div>
  );
}

export default React.memo(Setting);