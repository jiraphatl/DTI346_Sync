import React, { createContext, useState, useContext, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  // 1. Mock Data สำหรับ Events (ปฏิทิน)
  const [events, setEvents] = useState([
    { id: 1, date: '2025-10-02', title: 'ส่งงาน UX/UI', note: 'ส่งไฟล์ผ่าน Google Classroom', time: '09:00', status: 'done', type: 'assignment' },
    { id: 2, date: '2025-10-02', title: 'ประชุมกลุ่ม', note: 'เตรียมสไลด์พรีเซนต์', time: '13:00', status: 'pending', type: 'meeting' },
    { id: 3, date: '2025-10-15', title: 'สอบกลางภาค', note: 'วิชา Database', time: '09:00', status: 'pending', type: 'event' },
  ]);

  // 2. Mock Data สำหรับ Notifications (แจ้งเตือน)
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'urgent', title: 'ส่งงาน UX/UI Design', detail: 'ครบกำหนดส่งภายใน 1 ชั่วโมง', time: '1 ชม. ที่แล้ว', isRead: false },
    { id: 2, type: 'system', title: 'ยินดีต้อนรับสู่ Task Manager', detail: 'เริ่มจัดการงานของคุณได้เลย', time: '1 วันที่แล้ว', isRead: true },
  ]);

  // --- ฟังก์ชันเพิ่มรายการใหม่ (หัวใจหลักของการเชื่อมข้อมูล) ---
  const addNewItem = (newItem) => {
    // 1. เพิ่มลงในปฏิทิน (Events)
    const newEvent = {
      id: Date.now(),
      date: newItem.date,
      title: newItem.title,
      note: newItem.description || newItem.link || 'ไม่มีรายละเอียด',
      time: newItem.time,
      status: 'pending',
      type: newItem.type // meeting, event, assignment
    };
    setEvents((prev) => [...prev, newEvent]);

    // 2. ตรวจสอบเพื่อสร้างการแจ้งเตือน (Notifications)
    const todayStr = new Date().toISOString().split('T')[0];
    
    // ถ้าวันที่ตรงกับวันนี้ -> แจ้งเตือนด่วน (Urgent)
    if (newItem.date === todayStr) {
      const newNotif = {
        id: Date.now() + 1,
        type: 'reminder',
        title: `วันนี้: ${newItem.title}`,
        detail: `อย่าลืม! มีนัดหมายเวลา ${newItem.time}`,
        time: 'เมื่อสักครู่',
        isRead: false
      };
      setNotifications((prev) => [newNotif, ...prev]);
    } else {
      // ถ้าไม่ใช่วันนี้ -> แจ้งเตือนระบบว่าสร้างสำเร็จ (System Success)
      const newNotif = {
        id: Date.now() + 1,
        type: 'success',
        title: `สร้างรายการใหม่สำเร็จ`,
        detail: `เพิ่ม "${newItem.title}" ลงในปฏิทินแล้ว`,
        time: 'เมื่อสักครู่',
        isRead: false
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }
  };

  // --- ฟังก์ชันจัดการ Notifications ---
  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <DataContext.Provider value={{ 
      events, 
      notifications, 
      addNewItem, 
      markAsRead, 
      markAllAsRead, 
      deleteNotification 
    }}>
      {children}
    </DataContext.Provider>
  );
};