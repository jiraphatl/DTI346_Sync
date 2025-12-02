import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './CalendarPage.css';
import FloatingActionMenu from './FloatingActionMenu'; // Import ปุ่ม FAB เดิมมาใช้
import { useData } from '../DataContext'; // 1. Import Context
// --- SVG Icons Set (Optimized: No external files) ---
const Icons = {
  ChevronLeft: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  ChevronRight: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  Clock: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Check: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Trash: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  Dots: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>,
  
  // Nav Icons
  Home: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  
  // จุดที่แก้: ลบ \ หน้า " ออกทั้งหมด
  Calendar: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  
  Bell: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  User: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
};

// Mock Data
const sampleEvents = [
  { id: 1, date: '2025-10-02', title: 'ส่งงาน UX/UI', note: 'ส่งไฟล์ผ่าน Google Classroom', time: '09:00', status: 'done', type: 'work' },
  { id: 2, date: '2025-10-02', title: 'ประชุมกลุ่ม', note: 'เตรียมสไลด์พรีเซนต์', time: '13:00', status: 'pending', type: 'meeting' },
  { id: 3, date: '2025-10-15', title: 'สอบกลางภาค', note: 'วิชา Database', time: '09:00', status: 'pending', type: 'exam' },
  { id: 4, date: '2025-10-15', title: 'อ่านหนังสือ', note: 'บทที่ 1-5', time: '18:00', status: 'pending', type: 'study' },
];

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function CalendarPage() {
  const navigate = useNavigate();
  const { events } = useData(); 
  
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1)); // Oct 2025 (Mock date)
  const [selectedDateStr, setSelectedDateStr] = useState('2025-10-02');

  // --- Logic: สร้างปฏิทิน (ใช้ useMemo เพื่อ Performance) ---
  const calendarGrid = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // หาวันแรกของเดือน (0-6, 0=Sun) แต่เราต้องการ 0=Mon
    const firstDayObj = new Date(year, month, 1);
    let startDay = firstDayObj.getDay(); 
    if (startDay === 0) startDay = 7; // ปรับ Sun(0) ให้เป็น 7
    startDay -= 1; // ปรับให้ Mon=0 ... Sun=6
    
    // หาจำนวนวันในเดือน
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    // ช่องว่างก่อนวันแรก
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    // วันที่จริง
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  }, [currentDate]);

  // --- Logic: กรอง Event ตามวันที่เลือก ---
  const eventsForSelected = useMemo(() => {
    return events.filter(e => e.date === selectedDateStr);
  }, [selectedDateStr, events]);

  // --- Handlers ---
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  const handleDayClick = (day) => {
    if (!day) return;
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    setSelectedDateStr(`${year}-${month}-${dayStr}`);
  };

  // Helper function: เช็คว่าวันนั้นมี Event ไหม
  const hasEvent = (day) => {
    if (!day) return false;
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dStr = String(day).padStart(2, '0');
    const dateStr = `${year}-${month}-${dStr}`;
    return events.some(e => e.date === dateStr);
  };

  return (
    <div className="calendar-page-container">
      
      {/* --- ส่วน Header ด้านบน --- */}
      <header className="cal-header">
        <h1 className="page-title">ปฏิทิน</h1>
        <div className="month-navigator">
          <button className="nav-arrow" onClick={handlePrevMonth}><Icons.ChevronLeft /></button>
          <span className="current-month">
            {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button className="nav-arrow" onClick={handleNextMonth}><Icons.ChevronRight /></button>
        </div>
      </header>

      <div className="content-layout">
        {/* --- ส่วนปฏิทิน (ซ้ายในจอใหญ่ / บนในมือถือ) --- */}
        <div className="calendar-section">
          <div className="weekdays-grid">
            {WEEKDAYS.map(day => (
              <div key={day} className="weekday-header">{day}</div>
            ))}
          </div>
          <div className="days-grid">
            {calendarGrid.map((day, index) => {
              // เช็คว่าเป็นวันที่เลือกอยู่ไหม
              const isSelected = day && 
                selectedDateStr === `${currentDate.getFullYear()}-${String(currentDate.getMonth()+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
              
              return (
                <div 
                  key={index} 
                  className={`day-cell ${!day ? 'empty' : ''} ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                  {day && hasEvent(day) && <span className="event-dot"></span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* --- ส่วนรายการงาน (ขวาในจอใหญ่ / ล่างในมือถือ) --- */}
        <div className="events-section">
          <h2 className="section-heading">
            กิจกรรมวันที่ {selectedDateStr.split('-')[2]}
          </h2>
          
          <div className="events-list">
            {eventsForSelected.length === 0 ? (
              <div className="empty-state">ไม่มีกิจกรรมในวันนี้</div>
            ) : (
              eventsForSelected.map(ev => (
                <div key={ev.id} className={`event-card ${ev.status === 'done' ? 'done' : ''}`}>
                  <div className={`status-strip ${ev.type}`}></div>
                  <div className="event-content">
                    <h3 className="event-title">{ev.title}</h3>
                    <p className="event-note">{ev.note}</p>
                    <div className="event-meta">
                      <span className="time-badge">
                        <Icons.Clock /> {ev.time}
                      </span>
                    </div>
                  </div>
                  <div className="event-actions">
                     {/* ใช้ Icon แทน Emoji */}
                     <button className="action-btn check"><Icons.Check /></button>
                     <button className="action-btn delete"><Icons.Trash /></button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* --- Bottom Navigation (เหมือน HomePage) --- */}
      <nav className="bottom-nav">
        <div className="nav-wrapper">
          <button className="nav-item" onClick={() => navigate('/home')}>
            <span className="nav-icon"><Icons.Home /></span>
            <span className="nav-label"></span>
          </button>

          <button className="nav-item" onClick={() => navigate('/notifications')}>
            <span className="nav-icon"><Icons.Bell /></span>
            <span className="nav-label"></span>
          </button>

          <div className="fab-container">
            <FloatingActionMenu />
          </div>

          <button className="nav-item active">
            <span className="nav-icon"><Icons.Calendar /></span>
            <span className="nav-label"></span>
          </button>

          <button className="nav-item" onClick={() => navigate('/settings')}>
            <span className="nav-icon"><Icons.User /></span>
            <span className="nav-label"></span>
          </button>
        </div>
      </nav>

    </div>
  );
}

export default CalendarPage;