import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // ใช้ navigate สำหรับการเปลี่ยนหน้า
import './HomePage.css';
import FloatingActionMenu from './FloatingActionMenu';


// --- Pure SVG Icons ---
const Icons = {
  Home: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Calendar: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Bell: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  User: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Plus: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  LogOut: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
};

// --- Main Component ---
function HomePage({ user, onLogout }) {
  const [selectedDay, setSelectedDay] = useState(10); // Default เลือกวันที่ 10
  const [activeTab, setActiveTab] = useState('home');
  const navigate = useNavigate(); // ใช้ navigate เพื่อเปลี่ยนหน้า

  const handleCreateOnlineMeeting = () => {
    console.log('สร้างนัดหมายออนไลน์');
  };

  const handleCreateEvent = () => {
    console.log('สร้างกิจกรรมใหม่');
  };

  const handleAddAssignment = () => {
    console.log('เพิ่มงานที่ต้องส่ง');
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="main-header">
        <div className="header-content">
          <div className="user-greeting">
            <div className="avatar-circle">
          <img src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`} alt="Profile" />
        </div>
            <div>
              <h3>สวัสดี, {user?.name || 'นักศึกษา'}</h3>
              <p className="subtitle">มีความสุขกับวันนี้นะ!</p>
            </div>
          </div>
          <button className="logout-btn-desktop" onClick={onLogout}>
            <Icons.LogOut />
          </button>
        </div>
      </header>

      {/* Date Header */}
      <div className="date-header">
        <div className="date-display">
          <span className="highlight">10</span> ตุลาคม พ.ศ. <span className="highlight">2568</span>
        </div>
      </div>

      {/* Week Calendar */}
      <div className="week-calendar">
        <div className="week-days">
          {['จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.', 'อา.'].map((day, index) => (
            <button 
              key={index} 
              className={`day-item ${selectedDay === index + 7 ? 'selected' : ''}`}
              onClick={() => setSelectedDay(index + 7)}
            >
              <span className="day-name">{day}</span>
              <span className="day-number">{index + 7}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="content-section">
        {/* Timeline */}
        <div className="timeline-container">
          <h3 className="timeline-header">กำหนดการวันนี้</h3>
                  </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div className="nav-wrapper">
          <button 
            className={`nav-item ${activeTab === 'home' ? 'active' : ''}`} 
            onClick={() => {
              setActiveTab('home');
              navigate('/home'); 
            }}
          >
            <span className="nav-icon"><Icons.Home /></span>
            <span className="nav-label"></span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'bell' ? 'active' : ''}`} 
            onClick={() => {
              setActiveTab('bell');
              navigate('/notifications'); 
            }}
          >
            <span className="nav-icon"><Icons.Bell /></span>
            <span className="nav-label"></span>
          </button>

          <div className="fab-container">
            <FloatingActionMenu
              onCreateOnlineMeeting={handleCreateOnlineMeeting}
              onCreateEvent={handleCreateEvent}
              onAddAssignment={handleAddAssignment}
            />
          </div>

          <button 
            className={`nav-item ${activeTab === 'calendar' ? 'active' : ''}`} 
            onClick={() => {
              setActiveTab('calendar');
              navigate('/calendar'); 
            }}
          >
            <span className="nav-icon"><Icons.Calendar /></span>
            <span className="nav-label"></span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} 
            onClick={() => {
              setActiveTab('settings');
              navigate('/settings'); 
            }}
          >
            <span className="nav-icon"><Icons.User /></span>
            <span className="nav-label"></span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default HomePage;