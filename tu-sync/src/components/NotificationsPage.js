import React, { useState, useMemo, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import './NotificationsPage.css';
import FloatingActionMenu from './FloatingActionMenu';

// --- Efficiency: Use lightweight SVG components instead of heavy icon libraries ---
const Icons = {
  Home: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Calendar: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Bell: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  User: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Trash: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
  Alert: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  CheckCircle: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#43a047" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  Clock: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbc02d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Info: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e88e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  Empty: () => <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#e0e0e0" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
};

// --- Mock Data with ISO Dates for Grouping ---
const INITIAL_NOTIFICATIONS = [
  { id: 1, type: 'urgent', title: 'สอบย่อย Database', detail: 'อย่าลืมเตรียมตัวสอบพรุ่งนี้ 09:00 น. ห้อง 302', time: '08:30 น.', date: new Date().toISOString().split('T')[0], isRead: false },
  { id: 2, type: 'reminder', title: 'ส่งงาน UX/UI', detail: 'กำหนดส่งงาน Final Project ภายในคืนนี้', time: '10:00 น.', date: new Date().toISOString().split('T')[0], isRead: false },
  { id: 3, type: 'system', title: 'ลงทะเบียนเรียน', detail: 'ระบบจะเปิดให้ลงทะเบียนเพิ่ม-ถอน วันจันทร์หน้า', time: '14:20 น.', date: new Date(Date.now() - 86400000).toISOString().split('T')[0], isRead: true },
  { id: 4, type: 'success', title: 'ส่งงานสำเร็จ', detail: 'อัปโหลดไฟล์ Project_Final.pdf เรียบร้อยแล้ว', time: '16:45 น.', date: new Date(Date.now() - 172800000).toISOString().split('T')[0], isRead: true },
  { id: 5, type: 'reminder', title: 'นัดคุยงานกลุ่ม', detail: 'Meeting online ผ่าน Discord ตอน 20:00 น.', time: '19:00 น.', date: new Date(Date.now() - 86400000).toISOString().split('T')[0], isRead: false },
];

// --- Efficiency: Memoized Card Component prevents re-renders ---
const NotificationCard = memo(({ item, onRead, onDelete }) => {
  // Determine icon based on type
  const getIcon = (type) => {
    switch(type) {
      case 'urgent': return <Icons.Alert />;
      case 'success': return <Icons.CheckCircle />;
      case 'reminder': return <Icons.Clock />;
      case 'system': return <Icons.Info />;
      default: return <Icons.Bell />;
    }
  };

  return (
    <div 
      className={`notif-card ${item.type} ${!item.isRead ? 'unread' : ''}`}
      onClick={() => onRead(item.id)}
    >
      <div className={`notif-icon-box bg-${item.type}`}>
        {getIcon(item.type)}
      </div>
      
      <div className="notif-content">
        <div className="notif-top-row">
          <h3 className="notif-title">{item.title}</h3>
          <span className="notif-time">{item.time}</span>
        </div>
        <p className="notif-desc">{item.detail}</p>
        
        {/* Efficiency: Lazy Load avatars only if needed. Here we use a generic placeholder for efficiency */}
        {/* <img src="..." loading="lazy" alt="Sender" className="sender-avatar" /> */}
      </div>

      <button 
        className="delete-action-btn"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(item.id);
        }}
        aria-label="Delete notification"
      >
        <Icons.Trash />
      </button>
    </div>
  );
});

function NotificationsPage() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  // --- Efficiency: useMemo for Sorting & Grouping ---
  const groupedNotifications = useMemo(() => {
    let filtered = notifications;
    if (filter === 'unread') filtered = notifications.filter(n => !n.isRead);

    const groups = {
      today: [],
      yesterday: [],
      earlier: []
    };

    const todayStr = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    filtered.forEach(item => {
      if (item.date === todayStr) groups.today.push(item);
      else if (item.date === yesterdayStr) groups.yesterday.push(item);
      else groups.earlier.push(item);
    });

    return groups;
  }, [notifications, filter]);

  // --- Efficiency: useCallback avoids function recreation ---
  const handleMarkRead = useCallback((id) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  }, []);

  const handleDelete = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const handleClearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Helper to render groups
  const renderGroup = (title, items) => {
    if (items.length === 0) return null;
    return (
      <div className="notif-group">
        <h4 className="notif-group-title">{title}</h4>
        {items.map(item => (
          <NotificationCard 
            key={item.id} 
            item={item} 
            onRead={handleMarkRead}
            onDelete={handleDelete}
          />
        ))}
      </div>
    );
  };

  const hasNotifications = groupedNotifications.today.length > 0 || 
                          groupedNotifications.yesterday.length > 0 || 
                          groupedNotifications.earlier.length > 0;

  return (
    <div className="notif-page-container">
      {/* Header */}
      <div className="notif-header">
        <div className="header-text">
          <h1 className="page-title">แจ้งเตือน</h1>
          <p className="page-subtitle">คุณมี {notifications.filter(n => !n.isRead).length} การแจ้งเตือนที่ยังไม่อ่าน</p>
        </div>
        {notifications.length > 0 && (
          <button className="clear-all-btn" onClick={handleClearAll}>
            ล้างทั้งหมด
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs-container">
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            ทั้งหมด
          </button>
          <button 
            className={`filter-tab ${filter === 'unread' ? 'active' : ''}`}
            onClick={() => setFilter('unread')}
          >
            ยังไม่อ่าน
          </button>
        </div>
      </div>

      {/* List */}
      <div className="notif-list">
        {hasNotifications ? (
          <>
            {renderGroup('วันนี้', groupedNotifications.today)}
            {renderGroup('เมื่อวาน', groupedNotifications.yesterday)}
            {renderGroup('ก่อนหน้านี้', groupedNotifications.earlier)}
          </>
        ) : (
          <div className="empty-state">
            <Icons.Empty />
            <p>ไม่มีการแจ้งเตือน</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="bottom-nav">
        <div className="nav-wrapper">
          <button className="nav-item" onClick={() => navigate('/')}>
            <span className="nav-icon"><Icons.Home /></span>
          </button>
          <button className="nav-item active">
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

export default NotificationsPage;