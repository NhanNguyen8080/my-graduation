import './GraduationCard.css';
import studentImage from './assets/SE162122_1.jpg';
import mortarboardIcon from './assets/graduation-cap-removebg-preview.png';

function GraduationCard({ children, onBack, isSubmitting, guestName }) {
  return (
    <div className="graduation-card">
      {/* Decorative corner elements */}
      <div className="corner-decoration top-left-corner"></div>
      <div className="corner-decoration top-right-corner"></div>
      <div className="corner-decoration bottom-left-corner"></div>
      <div className="corner-decoration bottom-right-corner"></div>
      
      {onBack && (
        <button 
          className="btn back-btn card-top-left"
          onClick={onBack}
          disabled={isSubmitting}
        >
          ← Quay lại
        </button>
      )}
      
      <div className="card-header">
        <div className="title-section">
          <div className="title-decoration-line"></div>
          <h1 className="main-title">
            <span className="title-line-1">Thư mời</span>
            <span className="title-line-2">Tốt nghiệp</span>
          </h1>
          <div className="title-decoration-line"></div>
        </div>
        <div className="mortarboard-container">
          <img src={mortarboardIcon} alt="Mortarboard" className="mortarboard" />
        </div>
      </div>

      <div className="card-body-wrapper">
        <div className="student-image-container">
          <div className="image-frame">
            <img 
              src={studentImage} 
              alt="Sinh viên tốt nghiệp" 
              className="student-image"
            />
          </div>
        </div>
        <div className="card-content">
          <div className="invitation-section">
            <p className="invitation-text">Rất hân hạnh được mời</p>
            <h2 className="graduate-name">{guestName || 'Harumi Kobayashi'}</h2>
            <p className="invitation-text">tham dự buổi lễ tốt nghiệp của tôi</p>
          </div>
          
          <div className="divider-ornamental"></div>
          
          <div className="date-time-section">
            <div className="month">Tháng Mười Một</div>
            <div className="date-time-grid">
              <div className="day">Thứ Sáu</div>
              <div className="date">21</div>
              <div className="time">14:00</div>
            </div>
            <div className="year">2025</div>
          </div>
          
          <div className="divider-ornamental"></div>
          
          <div className="event-details">
            <div className="detail-item">
              <span className="detail-icon">📍</span>
              <div className="detail-content">
                <p className="detail-label">Địa điểm</p>
                <p className="detail-value">Trường Đại học FPT TP.HCM</p>
                <p className="detail-address">7 Đ. D1, Long Thạnh Mỹ, Thủ Đức, Thành phố Hồ Chí Minh</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {children}
    </div>
  );
}

export default GraduationCard;

