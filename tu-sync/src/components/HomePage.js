import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import FloatingActionMenu from './FloatingActionMenu';

// --- Pure SVG Icons ---
const Icons = {
  Home: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Calendar: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Bell: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  User: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Trash: (props) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
  LogOut: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  ChevronRight: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="9 18 15 12 9 6"/></svg>
};

// --- Mock Data to Demonstrate Scrolling ---
const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', '17:00', 
  '18:00', '19:00', '20:00', '21:00', '22:00'
];

const INITIAL_TASKS = [
  { id: 1, day: 10, time: '09:00', title: 'ส่งงาน UX/UI', completed: false, color: '#FFD700' },
  { id: 2, day: 10, time: '11:00', title: 'กินข้าวกับเพื่อน', completed: false, color: '#FF9800' },
  { id: 3, day: 10, time: '13:00', title: 'ประชุมกลุ่ม Project', completed: true, color: '#4CAF50' },
  { id: 4, day: 10, time: '16:00', title: 'ออกกำลังกาย', completed: false, color: '#2196F3' },
  { id: 5, day: 10, time: '19:00', title: 'อ่านหนังสือสอบ', completed: false, color: '#9C27B0' },
  { id: 6, day: 10, time: '21:00', title: 'ดูซีรีส์', completed: false, color: '#E91E63' },
  { id: 7, day: 11, time: '10:00', title: 'สอบย่อย Database', completed: false, color: '#FF5722' },
];

const TaskCard = ({ task, onToggle, onDelete }) => {
  return (
    <div className="task-card" style={{ borderLeft: `4px solid ${task.color || '#ccc'}` }}>
      <div className="task-content">
        <div className="checkbox-wrapper">
          <input 
            type="checkbox" 
            checked={task.completed} 
            onChange={() => onToggle(task.id)}
          />
        </div>
        <span className={`task-title ${task.completed ? 'completed' : ''}`}>
          {task.title}
        </span>
      </div>
      <button onClick={() => onDelete(task.id)} className="delete-btn">
        <Icons.Trash />
      </button>
    </div>
  );
};

function HomePage({ user, onLogout }) {
  const [selectedDay, setSelectedDay] = useState(10);
  const [activeTab, setActiveTab] = useState('home');
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  
  const navigate = useNavigate();

  const filteredTasks = useMemo(() => 
    tasks.filter(t => t.day === selectedDay),
    [tasks, selectedDay]
  );

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="main-header">
        <div className="header-content">
          <div className="user-greeting">
            <div className="avatar-circle">
              <img src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`} alt="Profile" />
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

      {/* Main Scrollable Content Area */}
      <div className="scroll-content">
        
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

        {/* TU Calendar Section (Banner Style) */}
        <div className="content-section">
          <div className="tu-calendar-card">
            <div className="tu-calendar-info">
              <h3>ปฏิทิน มธ.</h3>
              <p>ขอโควต้ารายวิชา: 6 - 10 ต.ค.</p>
            </div>
            <div className="tu-calendar-icon">
              <Icons.ChevronRight color="#fff" />
            </div>
          </div>
        </div>
        
        {/* Timeline */}
        <div className="timeline-container">
          <h3 className="timeline-header">กำหนดการวันนี้</h3>
          
          {filteredTasks.length > 0 ? (
            <div className="timeline">
              {TIME_SLOTS.map((time) => {
                const tasksAtTime = filteredTasks.filter(t => t.time === time);
                return (
                  <div key={time} className="timeline-slot">
                    <span className="time-label">{time}</span>
                    <div className="slot-content">
                      {tasksAtTime.length > 0 ? (
                        tasksAtTime.map(task => (
                          <TaskCard
                            key={task.id}
                            task={task}
                            onToggle={toggleTask}
                            onDelete={deleteTask}
                          />
                        ))
                      ) : (
                        <div className="empty-slot-line"></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-timeline">
              <Icons.Calendar width={48} height={48} stroke="#ccc" />
              <p>วันนี้ว่าง! ไม่มีงานค้าง</p>
            </div>
          )}
        </div>

        {/* IMPORTANT: Spacer is handled by padding-bottom in CSS, but this is a failsafe */}
        <div style={{ height: '20px' }}></div>
      </div>

      {/* --- Bottom Navigation --- */}
      <nav className="bottom-nav">
        <div className="nav-wrapper">
          <button className={`nav-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
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

          <button className="nav-item" onClick={() => navigate('/settings')}>
            <span className="nav-icon"><Icons.User /></span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default HomePage;