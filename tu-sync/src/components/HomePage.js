import React, { useState, useEffect } from 'react';
import './HomePage.css';

function HomePage({ user, userData, onLogout, onUpdateUserData }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    time: '10:00',
    title: '',
    category: 'งานทั่วไป',
    color: '#ff6f91'
  });

  // ใช้ข้อมูลจาก userData
  const tasks = userData?.tasks || [];
  const events = userData?.events || [];

  // ฟังก์ชันสำหรับ Calendar
  const monthNames = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];

  const dayNames = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const days = getDaysInMonth(currentDate);

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date) => {
    if (!date) return false;
    return date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear();
  };

  const hasEvent = (date) => {
    if (!date) return false;
    return events.some(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === date.getDate() &&
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getFullYear() === date.getFullYear();
    });
  };

  const changeMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  // ฟังก์ชันเพิ่มงานใหม่
  const handleAddTask = () => {
    if (!newTask.title.trim()) {
      alert('กรุณากรอกชื่องาน');
      return;
    }

    const task = {
      id: Date.now(),
      time: newTask.time,
      title: newTask.title,
      category: newTask.category,
      color: newTask.color,
      completed: false
    };

    const updatedData = {
      ...userData,
      tasks: [...tasks, task]
    };

    onUpdateUserData(updatedData);
    setNewTask({ time: '10:00', title: '', category: 'งานทั่วไป', color: '#ff6f91' });
    setShowAddTaskModal(false);
  };

  // ฟังก์ชันลบงาน
  const handleDeleteTask = (taskId) => {
    const updatedData = {
      ...userData,
      tasks: tasks.filter(t => t.id !== taskId)
    };
    onUpdateUserData(updatedData);
  };

  // ฟังก์ชันสลับสถานะงาน
  const handleToggleTask = (taskId) => {
    const updatedData = {
      ...userData,
      tasks: tasks.map(t => 
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    };
    onUpdateUserData(updatedData);
  };

  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="user-info">
            <div className="user-avatar">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="user-details">
              <h2>สวัสดี, {user?.username || 'ผู้ใช้'}</h2>
              <p>{user?.email}</p>
            </div>
          </div>
          <button className="logout-button" onClick={onLogout}>
            ออกจากระบบ
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Calendar Section */}
        <section className="calendar-section">
          <div className="calendar-header">
            <div className="month-year">
              <span className="current-date">
                {selectedDate.getDate()} {monthNames[currentDate.getMonth()]} พ.ศ.
              </span>
              <button className="dropdown-btn">
                {currentDate.getFullYear() + 543} ▼
              </button>
            </div>
            <div className="calendar-nav">
              <button onClick={() => changeMonth(-1)}>‹</button>
              <button onClick={() => changeMonth(1)}>›</button>
            </div>
          </div>

          {/* Week Days */}
          <div className="week-days">
            {dayNames.map((day, index) => (
              <div key={index} className="week-day">{day}</div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="calendar-grid">
            {days.map((date, index) => (
              <div
                key={index}
                className={`calendar-day ${!date ? 'empty' : ''} ${isToday(date) ? 'today' : ''} ${isSelected(date) ? 'selected' : ''} ${hasEvent(date) ? 'has-event' : ''}`}
                onClick={() => date && setSelectedDate(date)}
              >
                {date && (
                  <>
                    <span className="day-number">{date.getDate()}</span>
                    {hasEvent(date) && <span className="event-dot"></span>}
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Event Banners */}
          {events.filter(e => {
            const eventDate = new Date(e.date);
            return eventDate.getMonth() === currentDate.getMonth();
          }).map(event => (
            <div key={event.id} className="event-banner">
              <div className="event-icon">📅</div>
              <div className="event-details">
                <h4>{event.title}</h4>
                <p>{event.time}</p>
              </div>
            </div>
          ))}

          {tasks.length === 0 && events.length === 0 && (
            <div className="empty-state">
              <p>🎉 คุณยังไม่มีงานหรือกิจกรรม</p>
              <p>คลิกปุ่ม + ด้านล่างเพื่อเริ่มต้น</p>
            </div>
          )}
        </section>

        {/* Tasks Section */}
        <section className="tasks-section">
          <h3 className="section-title">กำหนดการวันนี้</h3>
          
          {tasks.length === 0 ? (
            <div className="empty-tasks">
              <p>📝 ยังไม่มีงานในวันนี้</p>
              <p className="small-text">เพิ่มงานใหม่เพื่อเริ่มต้นจัดการเวลาของคุณ</p>
            </div>
          ) : (
            <div className="time-slots">
              {['08.00', '10.00', '12.00', '14.00', '16.00', '18.00', '20.00', '22.00'].map((time) => {
                const task = tasks.find(t => t.time === time);
                
                return (
                  <div key={time} className="time-slot">
                    <div className="time-label">{time}</div>
                    {task ? (
                      <div className="task-card" style={{ backgroundColor: task.color }}>
                        <div 
                          className={`task-checkbox ${task.completed ? 'checked' : ''}`}
                          onClick={() => handleToggleTask(task.id)}
                        >
                          {task.completed && (
                            <svg viewBox="0 0 24 24" width="16" height="16">
                              <path fill="white" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                            </svg>
                          )}
                        </div>
                        <div className="task-content">
                          <h4 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                            {task.title}
                          </h4>
                          <p>{task.category}</p>
                        </div>
                        <button 
                          className="delete-task-btn"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div className="empty-slot"></div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button className="nav-item active">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
        </button>
        <button className="nav-item">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
        </button>
        <button className="nav-item">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
          </svg>
        </button>
        <button className="nav-item">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </button>
      </nav>

      {/* Floating Action Button */}
      <button className="fab" onClick={() => setShowAddTaskModal(true)}>
        <svg viewBox="0 0 24 24" width="28" height="28">
          <path fill="white" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
      </button>

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="modal-overlay" onClick={() => setShowAddTaskModal(false)}>
          <div className="add-task-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>เพิ่มงานใหม่</h3>
              <button className="close-modal" onClick={() => setShowAddTaskModal(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>ชื่องาน</label>
                <input
                  type="text"
                  placeholder="ระบุชื่องาน..."
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>เวลา</label>
                <select
                  value={newTask.time}
                  onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                >
                  {['08.00', '10.00', '12.00', '14.00', '16.00', '18.00', '20.00', '22.00'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>หมวดหมู่</label>
                <input
                  type="text"
                  placeholder="เช่น งานมหาวิทยาลัย, ประชุม"
                  value={newTask.category}
                  onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>สี</label>
                <div className="color-picker">
                  {['#ff6f91', '#f0a3ba', '#ff9800', '#4caf50', '#2196f3', '#9c27b0'].map(color => (
                    <button
                      key={color}
                      className={`color-option ${newTask.color === color ? 'selected' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setNewTask({ ...newTask, color })}
                    />
                  ))}
                </div>
              </div>

              <button className="add-button" onClick={handleAddTask}>
                เพิ่มงาน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
