import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './NotificationsPage.css';
import FloatingActionMenu from './FloatingActionMenu';
import { useData } from '../DataContext'; // ✅ แก้ Path ให้ถูกต้องแล้ว (ใช้ ./ แทน ../)

// --- SVG Icons ---
const Icons = {
  Home: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Calendar: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Bell: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  User: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Trash: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  CheckDouble: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  
  // Type Icons
  Alert: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  Clock: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  CheckCircle: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  Info: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
};

function NotificationsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [deletingId, setDeletingId] = useState(null); // สำหรับ Animation ตอนลบ

  // ดึงข้อมูลจาก Context
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useData();

  // จัดการการลบแบบมี Animation
  const handleDelete = (e, id) => {
    e.stopPropagation();
    setDeletingId(id);
    setTimeout(() => {
      deleteNotification(id);
      setDeletingId(null);
    }, 300); // รอ 300ms ให้ animation เล่นจบ
  };

  // Helper เลือกไอคอน
  const getIcon = (type) => {
    switch(type) {
      case 'urgent': return <Icons.Alert />;
      case 'reminder': return <Icons.Clock />;
      case 'success': return <Icons.CheckCircle />;
      default: return <Icons.Info />;
    }
  };

  // กรองข้อมูล
  const filteredList = useMemo(() => {
    return notifications.filter(n => {
      if (filter === 'unread') return !n.isRead;
      return true;
    });
  }, [notifications, filter]);

  // จัดกลุ่มข้อมูลตามเวลา (Today, Yesterday, Earlier) - ฟีเจอร์ใหม่!
  const groupedNotifications = useMemo(() => {
    const groups = { today: [], yesterday: [], earlier: [] };
    
    filteredList.forEach(item => {
      // Logic ง่ายๆ สำหรับ Mockup: เช็คคำว่า "วันนี้" หรือ "ชม." ในเวลา
      if (item.time.includes('วันนี้') || item.time.includes('ชม.') || item.time.includes('นาที')) {
        groups.today.push(item);
      } else if (item.time.includes('1 วันที่แล้ว') || item.time.includes('เมื่อวาน')) {
        groups.yesterday.push(item);
      } else {
        groups.earlier.push(item);
      }
    });
    return groups;
  }, [filteredList]);

  return (
    <div className="notif-page-container">
      
      {/* Header */}
      <header className="notif-header">
        <div>
          <h1 className="page-title">การแจ้งเตือน</h1>
          <p className="page-subtitle">คุณมี {notifications.filter(n => !n.isRead).length} รายการที่ยังไม่ได้อ่าน</p>
        </div>
        <button className="mark-read-btn" onClick={markAllAsRead} title="อ่านทั้งหมด">
          <Icons.CheckDouble /> <span>อ่านครบ</span>
        </button>
      </header>

      {/* Filter Tabs */}
      <div className="filter-tabs-container">
        <div className="filter-tabs">
          <button 
            className={`tab-btn ${filter === 'all' ? 'active' : ''}`} 
            onClick={() => setFilter('all')}
          >
            ทั้งหมด
          </button>
          <button 
            className={`tab-btn ${filter === 'unread' ? 'active' : ''}`} 
            onClick={() => setFilter('unread')}
          >
            ยังไม่อ่าน
            {notifications.some(n => !n.isRead) && <span className="unread-badge-small"></span>}
          </button>
        </div>
      </div>

      {/* List Content */}
      <div className="notif-content-area">
        {filteredList.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon"><Icons.Bell /></div>
            <h3>ไม่มีการแจ้งเตือน</h3>
            <p>คุณจัดการทุกอย่างเรียบร้อยแล้ว!</p>
          </div>
        ) : (
          <>
            {/* แสดงกลุ่ม "วันนี้" */}
            {groupedNotifications.today.length > 0 && (
              <div className="notif-group">
                <h4 className="group-title">วันนี้</h4>
                {groupedNotifications.today.map(item => (
                  <NotificationCard 
                    key={item.id} 
                    item={item} 
                    onRead={markAsRead} 
                    onDelete={handleDelete} 
                    getIcon={getIcon}
                    isDeleting={deletingId === item.id}
                  />
                ))}
              </div>
            )}

            {/* แสดงกลุ่ม "เมื่อวาน" */}
            {groupedNotifications.yesterday.length > 0 && (
              <div className="notif-group">
                <h4 className="group-title">เมื่อวานนี้</h4>
                {groupedNotifications.yesterday.map(item => (
                  <NotificationCard 
                    key={item.id} 
                    item={item} 
                    onRead={markAsRead} 
                    onDelete={handleDelete} 
                    getIcon={getIcon}
                    isDeleting={deletingId === item.id}
                  />
                ))}
              </div>
            )}

            {/* แสดงกลุ่ม "ก่อนหน้านี้" */}
            {groupedNotifications.earlier.length > 0 && (
              <div className="notif-group">
                <h4 className="group-title">ก่อนหน้านี้</h4>
                {groupedNotifications.earlier.map(item => (
                  <NotificationCard 
                    key={item.id} 
                    item={item} 
                    onRead={markAsRead} 
                    onDelete={handleDelete} 
                    getIcon={getIcon}
                    isDeleting={deletingId === item.id}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div className="nav-wrapper">
          <button className="nav-item" onClick={() => navigate('/home')}>
            <span className="nav-icon"><Icons.Home /></span>
            <span className="nav-label"></span>
          </button>

          <button className="nav-item active">
            <span className="nav-icon"><Icons.Bell /></span>
            <span className="nav-label"></span>
          </button>

          <div className="fab-container">
            <FloatingActionMenu />
          </div>

          <button className="nav-item" onClick={() => navigate('/calendar')}>
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

// แยก Component Card ออกมาเพื่อให้โค้ดสะอาด
const NotificationCard = ({ item, onRead, onDelete, getIcon, isDeleting }) => (
  <div 
    className={`notif-card ${item.type} ${!item.isRead ? 'unread' : ''} ${isDeleting ? 'deleting' : ''}`}
    onClick={() => onRead(item.id)}
  >
    <div className="notif-icon-box">
      {getIcon(item.type)}
    </div>
    
    <div className="notif-info">
      <div className="notif-header-row">
        <h3 className="notif-item-title">{item.title}</h3>
        <span className="notif-time">{item.time}</span>
      </div>
      <p className="notif-detail">{item.detail}</p>
    </div>

    <div className="notif-actions">
      {!item.isRead && <div className="status-dot"></div>}
      <button className="delete-btn" onClick={(e) => onDelete(e, item.id)}>
         <Icons.Trash />
      </button>
    </div>
  </div>
);

export default NotificationsPage;