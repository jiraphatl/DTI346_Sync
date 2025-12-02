import React, { useMemo, useState } from 'react';
import './CalendarPage.css';

const sampleEvents = [
  { id: 1, date: '2025-10-02', title: 'สายงานด่วน', note: 'ขอให้ตรวจสอบอีเมล 09:00-12:00 น.', time: '09:00', status: 'done' },
  { id: 2, date: '2025-10-02', title: 'Assignment 5', note: 'นัด Assignment UX Case Study', time: '15:00', status: 'pending' },
  { id: 3, date: '2025-10-02', title: 'ประชุม คณ. ครั้งที่ XX', note: 'ห้องประชุมสำนักงานคณะมนุษย์', time: '16:00', status: 'pending' },
  { id: 4, date: '2025-10-13', title: 'Standup', note: 'ทีม Dev', time: '10:00', status: 'pending' },
  { id: 5, date: '2025-10-17', title: 'Workshop', note: 'Figma', time: '13:00', status: 'pending' },
];

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function buildCalendar(year, monthIndex) {
  const firstDay = new Date(year, monthIndex, 1);
  const startOffset = (firstDay.getDay() + 6) % 7; // Monday = 0
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const days = [];
  for (let i = 0; i < startOffset; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  return days;
}

function CalendarPage({ hideNav = false }) {
  const [selectedDate, setSelectedDate] = useState('2025-10-02');
  const [year, setYear] = useState(2025);
  const [monthIndex, setMonthIndex] = useState(9); // Oct = 9

  const days = useMemo(() => buildCalendar(year, monthIndex), [year, monthIndex]);
  const monthLabel = useMemo(
    () => new Date(year, monthIndex, 1).toLocaleString('th-TH', { month: 'long', year: 'numeric' }),
    [year, monthIndex]
  );

  const dotsByDay = useMemo(() => {
    const map = {};
    sampleEvents.forEach((ev) => {
      if (ev.date.startsWith(`${year}-${String(monthIndex + 1).padStart(2, '0')}`)) {
        const d = Number(ev.date.split('-')[2]);
        map[d] = (map[d] || 0) + 1;
      }
    });
    return map;
  }, [year, monthIndex]);

  const eventsForSelected = useMemo(
    () => sampleEvents.filter((ev) => ev.date === selectedDate),
    [selectedDate]
  );

  const handleSelectDay = (day) => {
    if (!day) return;
    const dateStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
  };

  const goPrevMonth = () => {
    const next = new Date(year, monthIndex - 1, 1);
    setYear(next.getFullYear());
    setMonthIndex(next.getMonth());
  };

  const goNextMonth = () => {
    const next = new Date(year, monthIndex + 1, 1);
    setYear(next.getFullYear());
    setMonthIndex(next.getMonth());
  };

  return (
    <div className={`calendar-page ${hideNav ? 'embedded' : ''}`}>
      {!hideNav && (
        <div className="status-bar">
          <span>14:36</span>
          <div className="status-icons">
          </div>
        </div>
      )}

      <header className="page-header">
        <h1>ปฏิทิน</h1>
      </header>

      <section className="calendar-card">
        <div className="month-bar">
          <button onClick={goPrevMonth} aria-label="Prev month">‹</button>
          <div className="month-title">
            <div className="month-label">{monthLabel.split(' ')[0]}</div>
            <div className="year-label">{monthLabel.split(' ')[1]}</div>
          </div>
          <button onClick={goNextMonth} aria-label="Next month">›</button>
        </div>

        <div className="weekdays">
          {weekdays.map((d) => (
            <div key={d} className="weekday">{d}</div>
          ))}
        </div>

        <div className="days-grid">
          {days.map((day, idx) => {
            const isSelected = day && selectedDate.endsWith(`-${String(day).padStart(2, '0')}`);
            const dotCount = dotsByDay[day] || 0;
            return (
              <div
                key={idx}
                className={`day-cell ${day ? '' : 'empty'} ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelectDay(day)}
              >
                {day || ''}
                {dotCount > 0 && (
                  <div className="dots">
                    {Array.from({ length: Math.min(dotCount, 3) }).map((_, i) => (
                      <span key={i} className={`dot dot-${i % 3}`} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="events-section">
        <h2 className="events-date">
          {new Date(selectedDate).toLocaleDateString('th-TH', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </h2>

        <div className="events-list">
          {eventsForSelected.length === 0 && (
            <div className="empty-state">ยังไม่มีกิจกรรมในวันนี้</div>
          )}
          {eventsForSelected.map((ev) => (
            <div key={ev.id} className={`event-card ${ev.status === 'done' ? 'done' : ''}`}>
              <div className="event-icon">📄</div>
              <div className="event-body">
                <div className="event-title">{ev.title}</div>
                <div className="event-note">{ev.note}</div>
                <div className="event-time">⏰ {ev.time}</div>
              </div>
              <div className="event-actions">
                <button className={`pill ${ev.status === 'done' ? 'pill-green' : 'pill-gray'}`}>
                  {ev.status === 'done' ? '✓' : '…'}
                </button>
                <button className="pill pill-pink">×</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {!hideNav && (
        <>
          <nav className="bottom-nav">
            <button className="nav-btn"><span role="img" aria-label="home">🏠</span></button>
            <button className="nav-btn"><span role="img" aria-label="bell">🔔</span></button>
            <button className="nav-btn active"><span role="img" aria-label="calendar">📅</span></button>
            <button className="nav-btn"><span role="img" aria-label="user">👤</span></button>
          </nav>
          <button className="fab">+</button>
        </>
      )}
    </div>
  );
}

export default React.memo(CalendarPage);
