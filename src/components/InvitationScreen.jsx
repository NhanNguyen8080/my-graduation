import { useState, useEffect } from 'react';
import GraduationCard from '../GraduationCard';
import './InvitationScreen.css';

const RSVP_ENDPOINT = 'https://script.google.com/macros/s/AKfycbz-eHDgcwt1eQg8izutz5e0hvVT1HCqJcQvujRXxxWnuc72ooLDSm272VsXy8Yg3_8gTQ/exec';

function InvitationScreen({ guestName, guestEmail, onAttend, onDecline, onBack }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingButton, setSubmittingButton] = useState(null); // 'attend' | 'decline' | null

  // Debug: Log props khi component mount
  useEffect(() => {
    console.log('InvitationScreen mounted with:', {
      guestName,
      guestEmail,
      guestEmailType: typeof guestEmail,
      guestEmailLength: guestEmail?.length
    });
  }, [guestName, guestEmail]);

  const postRSVP = async (status, buttonType) => {
    if (!guestName || !RSVP_ENDPOINT) {
      console.warn('Missing guestName or RSVP_ENDPOINT');
      return;
    }
    
    // Normalize email: đảm bảo luôn là string, trim whitespace
    const normalizedEmail = (guestEmail && typeof guestEmail === 'string') 
      ? guestEmail.trim() 
      : '';
    
    const payload = {
      name: String(guestName).trim(),
      email: normalizedEmail,
      status: String(status), // 'tham dự' | 'không tham dự'
      at: new Date().toISOString(),
      ua: navigator.userAgent,
    };
    
    console.log('=== RSVP Debug Info ===');
    console.log('Guest Name:', guestName);
    console.log('Guest Email (raw):', guestEmail);
    console.log('Guest Email (normalized):', normalizedEmail);
    console.log('Email in payload:', payload.email);
    console.log('Email type:', typeof payload.email);
    console.log('Email length:', payload.email.length);
    console.log('Full Payload:', JSON.stringify(payload, null, 2));
    console.log('Payload keys:', Object.keys(payload));
    console.log('JSON String:', JSON.stringify(payload));
    console.log('========================');
    
    try {
      setIsSubmitting(true);
      setSubmittingButton(buttonType); // 'attend' | 'decline'
      
      // Gửi dưới dạng form-encoded để tương thích tốt hơn với no-cors mode
      // Google Apps Script sẽ đọc từ e.parameter khi nhận form-encoded data
      const formData = new URLSearchParams();
      formData.append('name', payload.name);
      formData.append('email', payload.email);
      formData.append('status', payload.status);
      formData.append('at', payload.at);
      formData.append('ua', payload.ua);
      
      console.log('Form Data String:', formData.toString());
      console.log('Email in form data:', formData.get('email'));
      
      const response = await fetch(RSVP_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
        mode: 'no-cors',
      });
      
      console.log('Fetch completed (no-cors mode, no response body)');
      console.log('Request sent with email:', normalizedEmail || '(empty)');
      console.log('Sent as form-encoded (application/x-www-form-urlencoded)');
    } catch (error) {
      console.error('RSVP Error:', error);
    } finally {
      setIsSubmitting(false);
      setSubmittingButton(null);
    }
  };

  const handleAttend = async () => {
    await postRSVP('tham dự', 'attend');
    onAttend();
  };

  const handleDecline = async () => {
    await postRSVP('không tham dự', 'decline');
    onDecline();
  };

  return (
    <div className="invitation-screen">
      <div className="invitation-wrapper">
        <GraduationCard onBack={onBack} isSubmitting={isSubmitting} guestName={guestName}>
          <div className="card-actions">
            <p className="rsvp-label">Xác nhận tham dự: </p>
            <div className="card-buttons">
              <button 
                className="btn success" 
                onClick={handleAttend}
                disabled={isSubmitting}
              >
                {submittingButton === 'attend' ? (
                  <span className="btn-loading">
                    <span className="spinner"></span>
                    Đang xử lý...
                  </span>
                ) : (
                  'Không thể không đến'
                )}
              </button>
              <button 
                className="btn neutral" 
                onClick={handleDecline}
                disabled={isSubmitting}
              >
                {submittingButton === 'decline' ? (
                  <span className="btn-loading">
                    <span className="spinner"></span>
                    Đang xử lý...
                  </span>
                ) : (
                  'Không thể đến'
                )}
              </button>
            </div>
          </div>
        </GraduationCard>
      </div>
    </div>
  );
}

export default InvitationScreen;

