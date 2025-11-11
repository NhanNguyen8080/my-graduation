import './GraduationCard.css';
import studentImage from './assets/SE162122_1.jpg';

function GraduationCard({ children, onBack, isSubmitting, guestName }) {
  return (
    <div className="graduation-card">
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
          <h1 className="main-title">
            <span className="title-line-1">Thư mời</span>
            <span className="title-line-2">Tốt nghiệp</span>
          </h1>
        </div>
      </div>

      <div className="card-body-wrapper">
        <div className="student-image-container">
          <img 
            src={studentImage} 
            alt="Sinh viên tốt nghiệp" 
            className="student-image"
          />
        </div>
        <div className="card-content">
          <div style={{ marginBottom: '20px' }}>
            <p className="invitation-text">Rất hân hạnh được mời</p>
            <h2 className="graduate-name">{guestName || 'Harumi Kobayashi'}</h2>
            <p className="invitation-text">tham dự buổi lễ tốt nghiệp của tôi</p>
          </div>
          
          <div className="date-time-section">
            <div className="month">Tháng Mười Một</div>
            <div className="date-time-grid">
              <div className="day">Thứ Sáu</div>
              <div className="date">21</div>
              <div className="time">14:00</div>
            </div>
            <div className="year">2025</div>
          </div>
          <div className="card-footer">
        <p className="location">Trường Đại học FPT TP.HCM</p>
      </div>
        </div>
      </div>

      
      
      {children}
    </div>
  );
}

export default GraduationCard;

