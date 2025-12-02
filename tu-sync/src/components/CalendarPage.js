import React, { useState, useMemo, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import './CalendarPage.css';
import FloatingActionMenu from './FloatingActionMenu';

// --- Efficiency: Inline SVGs (No Network Requests/CDN dependent) ---
const Icons = {
  Home: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Calendar: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Bell: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  User: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  ChevronLeft: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  ChevronRight: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  Clock: () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Check: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Plus: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
};

const MONTH_NAMES = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
];

const WEEKDAYS = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];

// Mock Data (Simulating efficient data fetching)
const MOCK_EVENTS = [
  { id: 1, title: 'สอบย่อย Database', time: '09:00 - 10:30', date: 15, type: 'urgent' },
  { id: 2, title: 'ประชุมกลุ่ม Project', time: '13:00 - 15:00', date: 15, type: 'normal' },
  { id: 3, title: 'ส่งงาน UX/UI', time: '23:59', date: 18, type: 'urgent' },
  { id: 4, title: 'ซ้อมดนตรี', time: '17:00 - 19:00', date: 20, type: 'personal' },
];

// --- Optimization: Memoized Components (Cache-like behavior) ---

// DayCell only re-renders if its specific props change
const DayCell = memo(({ dayObj, isSelected, isToday, hasEvent, onClick }) => {
  if (dayObj.empty) return <div className="day-cell empty"></div>;

  return (
    <div 
      className={`day-cell ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
      onClick={() => onClick(dayObj.day)}
    >
      <span className="day-number">{dayObj.day}</span>
      {hasEvent && <div className="dot-indicator"></div>}
    </div>
  );
});

// EventCard is static and doesn't need re-rendering unless data changes
const EventCard = memo(({ event }) => (
  <div className={`event-card type-${event.type}`}>
    <div className="event-time-col">
      <Icons.Clock />
      <span>{event.time.split(' ')[0]}</span>
    </div>
    <div className="event-details">
      <h4>{event.title}</h4>
      <p>{event.time}</p>
    </div>
    <div className="event-actions">
      <button className="action-btn" aria-label="Mark done"><Icons.Check /></button>
    </div>
  </div>
));

function CalendarPage() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  // --- Optimization: useMemo for Calendar Grid Calculation ---
  // Heavy logic is only executed when the month actually changes.
  const calendarData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();
    
    const daysArray = [];
    
    // Padding days (empty slots)
    for (let i = 0; i < firstDayIndex; i++) {
      daysArray.push({ empty: true, key: `empty-${i}` });
    }
    
    // Actual days
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push({ day: i, empty: false, key: `day-${i}` });
    }

    return daysArray;
  }, [currentDate]); // Dependency array ensures efficiency

  // --- Handlers (Memoized) ---
  const handlePrevMonth = useCallback(() => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  const handleDayClick = useCallback((day) => {
    setSelectedDay(day);
  }, []);

  const handleToday = useCallback(() => {
    const now = new Date();
    setCurrentDate(now);
    setSelectedDay(now.getDate());
  }, []);

  // Filter events efficiently
  const selectedEvents = useMemo(() => {
    return MOCK_EVENTS.filter(e => e.date === selectedDay);
  }, [selectedDay]);

  const checkEvent = useCallback((day) => {
    return MOCK_EVENTS.some(e => e.date === day);
  }, []);

  return (
    <div className="calendar-page-container">
      {/* Header */}
      <div className="cal-header">
        <h1 className="page-title">
          {MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear() + 543}
        </h1>
        <div className="header-actions">
          <button className="btn-secondary" onClick={handleToday}>วันนี้</button>
          <button className="btn-primary">
            <Icons.Plus /> เพิ่ม
          </button>
        </div>
      </div>

      <div className="content-layout">
        {/* Calendar Grid Section */}
        <div className="calendar-section">
          <div className="cal-nav">
            <button className="nav-btn" onClick={handlePrevMonth}><Icons.ChevronLeft /></button>
            <span className="current-month-label">
              {MONTH_NAMES[currentDate.getMonth()]}
            </span>
            <button className="nav-btn" onClick={handleNextMonth}><Icons.ChevronRight /></button>
          </div>

          <div className="calendar-grid">
            <div className="weekdays-row">
              {WEEKDAYS.map((d, i) => <div key={i} className="weekday">{d}</div>)}
            </div>
            <div className="days-grid">
              {calendarData.map((dayObj) => (
                <DayCell 
                  key={dayObj.key}
                  dayObj={dayObj}
                  isSelected={!dayObj.empty && dayObj.day === selectedDay}
                  isToday={!dayObj.empty && dayObj.day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth()}
                  hasEvent={!dayObj.empty && checkEvent(dayObj.day)}
                  onClick={handleDayClick}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Events List Section */}
        <div className="events-section">
          <h3 className="section-title">
            {selectedDay} {MONTH_NAMES[currentDate.getMonth()]}
          </h3>
          
          <div className="events-list">
            {selectedEvents.length > 0 ? (
              selectedEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="empty-state">
                <p>ไม่มีกิจกรรมวันนี้</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bottom-nav">
        <div className="nav-wrapper">
          <button className="nav-item" onClick={() => navigate('/')}>
            <span className="nav-icon"><Icons.Home /></span>
          </button>
          <button className="nav-item" onClick={() => navigate('/notifications')}>
            <span className="nav-icon"><Icons.Bell /></span>
          </button>
          <div className="fab-container">
            <FloatingActionMenu />
          </div>
          <button className="nav-item active">
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

export default CalendarPage;