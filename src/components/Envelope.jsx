import { useState, useEffect } from 'react';
import './Envelope.css';

function Envelope({ onOpen }) {
  const [isOpened, setIsOpened] = useState(false);

  const handleClick = () => {
    if (!isOpened) {
      setIsOpened(true);
      setTimeout(() => {
        onOpen();
      }, 600);
    }
  };

  return (
    <div className="envelope-wrapper">
      <div 
        className={`envelope ${isOpened ? 'opened' : ''}`}
        onClick={handleClick}
      >
        <div className="envelope-front">
          <div className="envelope-flap"></div>
          <div className="envelope-body">
            <div className="envelope-seal">
              <span>✉️</span>
            </div>
            <div className="envelope-address">
              <p className="envelope-label">Thư mời Tốt nghiệp</p>
              <p className="envelope-date">21/11 • 14:00</p>
              <p className="envelope-location">Trường Đại học FPT TP.HCM</p>
              {!isOpened && <p className="envelope-hint">👆 Click để mở</p>}
            </div>
          </div>
        </div>
        <div className="envelope-back">
          <div className="card envelope-card">
            <h1>Thiệp mời Tốt nghiệp</h1>
            <p className="subtext">26/11 lúc 10:00 • Trường Đại học FPT TP.HCM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Envelope;

