import React from 'react';
import './NotificationsPage.css';

const notifications = [
  { id: 1, icon: '⏳', title: 'ช่วงลงโควตาเริ่มวันนี้', detail: 'อย่าลืมเลือกวิชาที่ต้องการนะ!' },
  { id: 2, icon: '🗓️', title: 'Reminder 💡 ส่ง Assignment: UX', detail: 'Case Study ก่อน 23:59 ค่ืนนี้' },
  { id: 3, icon: '📅', title: 'วันนี้เป็นวันสุดท้าย! ส่ง Assignment', detail: 'ก่อน 23:59 น. ⏰' },
  { id: 4, icon: '‼️', title: 'อีก 1 ชั่วโมงครบกำหนดส่งงาน Mobile App', detail: 'รีบตรวจสอบก่อนส่งให้เรียบร้อยนะ' },
  { id: 5, icon: '⚠️', title: 'วันนี้เป็นวันสุดท้ายของการถอน W', detail: '' },
  { id: 6, icon: '✉️', title: 'มีงานใหม่: Quiz#3 วิชา Database', detail: 'ตรวจสอบรายละเอียดใน Teams' },
  { id: 7, icon: '✅', title: 'คะแนนงาน Weekly Assignment', detail: 'ได้รับการอัปเดตแล้ว' },
];

function NotificationsPage({ hideNav = false }) {
  return (
    <div className={`notifications-page ${hideNav ? 'embedded' : ''}`}>
      {!hideNav && (
        <div className="status-bar">
          <span>14:36</span>
          <div className="status-icons">

          </div>
        </div>
      )}

      <header className="notif-header">
        <h1>การแจ้งเตือนทั้งหมด</h1>
      </header>

      <div className="notif-list">
        {notifications.map((n) => (
          <div key={n.id} className="notif-card">
            <div className="notif-icon">📅</div>
            <div className="notif-text">
              <div className="notif-title">{n.title}</div>
              {n.detail && <div className="notif-detail">{n.detail}</div>}
            </div>
            <div className="notif-mark">{n.icon}</div>
          </div>
        ))}
      </div>

      {!hideNav && (
        <>
          <nav className="notif-bottom-nav">
            <button className="nav-btn"><span role="img" aria-label="home">🏠</span></button>
            <button className="nav-btn active"><span role="img" aria-label="bell">🔔</span></button>
            <button className="nav-btn"><span role="img" aria-label="calendar">📅</span></button>
            <button className="nav-btn"><span role="img" aria-label="user">👤</span></button>
          </nav>
          <button className="notif-fab">+</button>
        </>
      )}
    </div>
  );
}

export default React.memo(NotificationsPage);
