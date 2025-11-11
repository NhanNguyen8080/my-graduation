import qrCodeImage from '../assets/qrcode.png';
import './QRCodeScreen.css';

function QRCodeScreen({ onBack }) {
  return (
    <div className="qr-screen">
      <div className="card">
        <h1>KHÔNG TỚI CŨNG ĐƯỢC THÔI 🫵👇</h1>
        <div className="qrcode">
          <img src={qrCodeImage} alt="Mã QR chuyển khoản" id="qr-image" />
        </div>
        <button className="btn" onClick={onBack}>
          Quay lại
        </button>
      </div>
    </div>
  );
}

export default QRCodeScreen;

