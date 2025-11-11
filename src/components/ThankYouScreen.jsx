import './ThankYouScreen.css';

const PHONE = '0338882943';
const FACEBOOK_URL = 'https://www.facebook.com/quoc.nhan.451561';

function ThankYouScreen({ onBack }) {
  return (
    <div className="thank-you-screen">
      <div className="thank-you-card">
        <div className="card-header">
          <div className="title-section">
            <h1 className="main-title">
              <span className="title-line-1">Cảm ơn</span>
              <span className="title-line-2">bạn</span>
            </h1>
          </div>
        </div>

        <div className="card-content">
          <p className="thank-you-text">Sự có mặt của bạn là niềm vinh hạnh của tôi</p>
          <p className="contact-text">
            Mọi thắc mắc vui lòng liên hệ:{' '}
            <a href={`tel:${PHONE}`} className="phone">
              {PHONE}
            </a>
            {' hoặc '}
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="facebook-link">
              Facebook
            </a>
          </p>
        </div>

        <div className="card-footer">
          <button className="btn back-btn" onClick={onBack}>
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThankYouScreen;

