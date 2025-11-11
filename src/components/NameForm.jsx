import { useState, useEffect, useRef } from 'react';
import './NameForm.css';

function NameForm({ onSubmit, initialName = '' }) {
  const [name, setName] = useState(initialName);
  const nameInputRef = useRef(null);

  useEffect(() => {
    // Focus input after envelope animation
    const timer = setTimeout(() => {
      nameInputRef.current?.focus();
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Check URL params for pre-filled name
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const prefillName = (params.get('name') || '').trim();
    if (prefillName) {
      setName(prefillName);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (trimmedName) {
      onSubmit({ name: trimmedName });
    } else {
      nameInputRef.current?.focus();
    }
  };

  return (
    <div className="name-form-screen">
      <div className="name-form-card">
        <div className="card-header">
          <div className="title-section">
            <h1 className="main-title">
              <span className="title-line-1">Thư mời</span>
              <span className="title-line-2">Tốt nghiệp</span>
            </h1>
          </div>
        </div>

        <div className="card-content">
          <p className="invitation-text">Cho mình xin name của bạn nhé.</p>
          
          <form onSubmit={handleSubmit} autoComplete="off" className="name-form">
            <div className="form-group">
              <label htmlFor="guestName">Tên của bạn</label>
              <input
                id="guestName"
                name="guestName"
                type="text"
                placeholder="VD: Nguyễn Quốc Nhân"
                value={name}
                onChange={(e) => setName(e.target.value)}
                ref={nameInputRef}
                required
              />
            </div>
            
            <button type="submit" className="btn submit-btn">
              Tiếp tục
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NameForm;

