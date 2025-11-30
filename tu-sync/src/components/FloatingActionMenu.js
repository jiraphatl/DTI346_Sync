// src/components/FloatingActionMenu.js
import React, { useState } from "react";
import "./FloatingActionMenu.css";

function FloatingActionMenu({
  onCreateOnlineMeeting,
  onCreateEvent,
  onAddAssignment,
}) {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="fab-wrapper">
      {/* เมนู 3 ปุ่ม */}
      {open && (
        <div className="fab-menu">
          <button className="fab-menu-item" onClick={onCreateOnlineMeeting}>
            สร้างนัดหมายออนไลน์
          </button>

          <button className="fab-menu-item" onClick={onCreateEvent}>
            สร้างกิจกรรมใหม่
          </button>

          <button className="fab-menu-item" onClick={onAddAssignment}>
            เพิ่มงานที่ต้องส่ง
          </button>
        </div>
      )}

      {/* ปุ่ม + กลม ๆ สีชมพู */}
      <button
        className={`fab-main ${open ? "fab-main-open" : ""}`}
        onClick={toggleMenu}
      >
        +
      </button>
    </div>
  );
}

export default FloatingActionMenu;
