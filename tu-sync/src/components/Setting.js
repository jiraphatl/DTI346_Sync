import React, { useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import "./Setting.css";
import FloatingActionMenu from "./FloatingActionMenu";

const Icons = {
  Home: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Calendar: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Bell: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  User: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  ChevronRight: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  Edit: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Shield: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Moon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  Globe: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Help: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  LogOut: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF5252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
};

const SettingItem = memo(({ icon: Icon, title, isDestructive, onClick }) => (
  <div className="setting-item" onClick={onClick}>
    <div className="item-left">
      <div className={`icon-box ${isDestructive ? 'destructive' : ''}`}>
        <Icon />
      </div>
      <span className={`item-text ${isDestructive ? 'destructive-text' : ''}`}>
        {title}
      </span>
    </div>
    <div className="item-arrow">
      {!isDestructive && <Icons.ChevronRight />}
    </div>
  </div>
));

function Setting({ user, onLogout }) {
  const navigate = useNavigate();

  const settingsGroups = useMemo(() => [
    {
      title: "บัญชี",
      items: [
        { icon: Icons.Edit, title: "แก้ไขโปรไฟล์", path: "/edit-profile" },
        { icon: Icons.Shield, title: "ความปลอดภัย", path: "/security" }
      ]
    },
    {
      title: "ทั่วไป",
      items: [
        { icon: Icons.Moon, title: "โหมดมืด (Dark Mode)", path: "#" },
        { icon: Icons.Globe, title: "ภาษา / Language", path: "#" }
      ]
    },
    {
      title: "ความช่วยเหลือ",
      items: [
        { icon: Icons.Help, title: "ช่วยเหลือและสนับสนุน", path: "/help" }
      ]
    }
  ], []);

  return (
    <div className="main-container">
      <div className="profile-header">
        <div className="avatar-wrapper">
          <img 
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              user?.name || "User"
            )}&background=random&size=128`} 
            alt="Profile" 
            className="profile-img"
            loading="lazy"
          />
          <button className="edit-avatar-btn"><Icons.Edit /></button>
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{user?.name || "นักศึกษา มธ."}</h2>
          <p className="profile-email">{user?.email || "student@dome.tu.ac.th"}</p>
          
        </div>
      </div>

      <div className="settings-container">
        {settingsGroups.map((group, index) => (
          <div key={index} className="settings-group">
            <h3 className="group-title">{group.title}</h3>
            <div className="group-content">
              {group.items.map((item, idx) => (
                <SettingItem 
                  key={idx}
                  icon={item.icon}
                  title={item.title}
                  onClick={() => item.path !== "#" && navigate(item.path)}
                />
              ))}
            </div>
          </div>
        ))}

        <div className="settings-group">
          <div className="group-content">
            <SettingItem 
              icon={Icons.LogOut} 
              title="ออกจากระบบ" 
              isDestructive={true}
              onClick={() => {
                if (onLogout) onLogout();
                navigate("/");
              }}
            />
          </div>
        </div>
        
        <div className="app-version">Version 1.0.2</div>
      </div>

      <nav className="bottom-nav">
        <div className="nav-wrapper">
          <button className="nav-item" onClick={() => navigate('/home')}>
            <span className="nav-icon"><Icons.Home /></span>
          </button>
          <button className="nav-item" onClick={() => navigate('/notifications')}>
            <span className="nav-icon"><Icons.Bell /></span>
          </button>
          <div className="fab-container">
            <FloatingActionMenu />
          </div>
          <button className="nav-item" onClick={() => navigate('/calendar')}>
            <span className="nav-icon"><Icons.Calendar /></span>
          </button>
          <button className="nav-item active">
            <span className="nav-icon"><Icons.User /></span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Setting;
