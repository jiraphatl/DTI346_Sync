import React, { useState } from 'react';
import './CreateModal.css';

// --- SVG Icons Set ---
const Icons = {
  Close: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  Save: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>,
  Clock: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
  Link: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>,
  Type: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>,
  Loading: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="spin-anim"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
};

function CreateModal({ type, onClose, onSave }) {
  const [isLoading, setIsLoading] = useState(false);
  
  // State ข้อมูลฟอร์ม
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0], // Default วันปัจจุบัน
    time: '09:00',
    link: '',
    description: '',
    platform: 'Zoom'
  });

  const getHeader = () => {
    switch (type) {
      case 'meeting': return 'สร้างนัดหมายออนไลน์';
      case 'event': return 'สร้างกิจกรรมใหม่';
      case 'assignment': return 'เพิ่มงานที่ต้องส่ง';
      default: return 'สร้างรายการใหม่';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // --- MOCK PROCESS เริ่มตรงนี้ ---
    // จำลองความล่าช้า 800ms เหมือนยิง API จริง
    await new Promise(resolve => setTimeout(resolve, 800));

    // สร้าง Mock Data Object
    const newId = Math.floor(Math.random() * 10000); // สุ่ม ID
    const mockResponse = {
      id: newId,
      type: type, // meeting, event, assignment
      status: 'pending',
      createdAt: new Date().toISOString(),
      ...formData
    };

    console.log("✅ Mock API Success:", mockResponse);
    
    // ส่งข้อมูลกลับไปให้ Component แม่ (ถ้ามีการส่ง prop onSave มา)
    if (onSave) {
      onSave(mockResponse);
    }

    setIsLoading(false);
    onClose(); // ปิด Modal
    // --- MOCK PROCESS จบ ---
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
          <h2 className="modal-title">{getHeader()}</h2>
          <button className="close-btn" onClick={onClose} disabled={isLoading}>
            <Icons.Close />
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label className="form-label">หัวข้อ</label>
            <div className="input-wrapper">
              <span className="input-icon"><Icons.Type /></span>
              <input 
                type="text" 
                className="form-input" 
                placeholder={type === 'assignment' ? "เช่น ส่งงาน UX/UI" : "ชื่อรายการ..."}
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label className="form-label">วันที่</label>
              <input 
                type="date" 
                className="form-input" 
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
                disabled={isLoading}
              />
            </div>
            <div className="form-group half">
              <label className="form-label">เวลา</label>
              <div className="input-wrapper">
                <span className="input-icon"><Icons.Clock /></span>
                <input 
                  type="time" 
                  className="form-input" 
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {type === 'meeting' && (
            <>
              <div className="form-group">
                <label className="form-label">แพลตฟอร์ม</label>
                <select 
                  className="form-input"
                  value={formData.platform}
                  onChange={(e) => setFormData({...formData, platform: e.target.value})}
                  disabled={isLoading}
                >
                  <option value="Zoom">Zoom Meeting</option>
                  <option value="Teams">Microsoft Teams</option>
                  <option value="GoogleMeet">Google Meet</option>
                  <option value="Other">อื่นๆ</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">ลิงก์การประชุม</label>
                <div className="input-wrapper">
                  <span className="input-icon"><Icons.Link /></span>
                  <input 
                    type="url" 
                    className="form-input" 
                    placeholder="https://..." 
                    value={formData.link}
                    onChange={(e) => setFormData({...formData, link: e.target.value})}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </>
          )}

          {(type === 'assignment' || type === 'event') && (
            <div className="form-group">
              <label className="form-label">รายละเอียดเพิ่มเติม</label>
              <textarea 
                className="form-textarea" 
                rows="3" 
                placeholder="ระบุรายละเอียด..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                disabled={isLoading}
              ></textarea>
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose} disabled={isLoading}>ยกเลิก</button>
            <button type="submit" className="btn-save" disabled={isLoading}>
              {isLoading ? (
                <>
                   <Icons.Loading /> กำลังบันทึก...
                </>
              ) : (
                <>
                   <Icons.Save /> บันทึกข้อมูล
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default CreateModal;