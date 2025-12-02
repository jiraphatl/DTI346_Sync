import React, { useState, Suspense } from "react";
import "./FloatingActionMenu.css";
import { useData } from "../DataContext"; // 1. Import Context
// Lazy Load
const CreateModal = React.lazy(() => import('./CreateModal'));

const MenuIcons = {
  Video: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
  Calendar: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  FileText: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  Plus: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
};

function FloatingActionMenu() {
  const [open, setOpen] = useState(false);
  const [activeModalType, setActiveModalType] = useState(null);

  const { addNewItem } = useData();



  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  const handleOpenModal = (type) => {
    setActiveModalType(type);
    setOpen(false);
  };
  const handleSaveMockData = (newData) => {
    addNewItem(newData); // ยิงข้อมูลเข้าส่วนกลาง
    
    // Alert แจ้งเตือนผู้ใช้ (Optional)
    alert(`บันทึกข้อมูล "${newData.title}" เรียบร้อย!`);
  };

  return (
    <>
      <div className="fab-wrapper">
        {open && (
          <div className="fab-menu">
            <button className="fab-menu-item" onClick={() => handleOpenModal('meeting')}>
              <MenuIcons.Video /> <span>สร้างนัดหมายออนไลน์</span>
            </button>
            <button className="fab-menu-item" onClick={() => handleOpenModal('event')}>
              <MenuIcons.Calendar /> <span>สร้างกิจกรรมใหม่</span>
            </button>
            <button className="fab-menu-item" onClick={() => handleOpenModal('assignment')}>
              <MenuIcons.FileText /> <span>เพิ่มงานที่ต้องส่ง</span>
            </button>
          </div>
        )}

        <button className={`fab-main ${open ? 'fab-main-open' : ''}`} onClick={toggleMenu}>
          <MenuIcons.Plus />
        </button>
      </div>

      {activeModalType && (
        <Suspense fallback={null}> 
          <CreateModal 
            type={activeModalType} 
            onClose={() => setActiveModalType(null)}
            onSave={handleSaveMockData}  // ส่งฟังก์ชันรับค่ากลับไป
          />
        </Suspense>
      )}
    </>
  );
}

export default FloatingActionMenu;