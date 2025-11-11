import { useState, useEffect } from 'react';
import Envelope from './components/Envelope';
import NameForm from './components/NameForm';
import InvitationScreen from './components/InvitationScreen';
import ThankYouScreen from './components/ThankYouScreen';
import QRCodeScreen from './components/QRCodeScreen';
import './App.css';

const SCREENS = {
  ENVELOPE: 'envelope',
  NAME_FORM: 'name-form',
  INVITATION: 'invitation',
  THANK_YOU: 'thank-you',
  QR_CODE: 'qr-code',
};

function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.ENVELOPE);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');

  // Check sessionStorage on mount
  useEffect(() => {
    const savedName = sessionStorage.getItem('guestName');
    if (savedName) {
      setGuestName(savedName);
      setCurrentScreen(SCREENS.INVITATION);
      document.title = `Thiệp mời • ${savedName}`;
    }
  }, []);

  const handleEnvelopeOpen = () => {
    setCurrentScreen(SCREENS.NAME_FORM);
  };

  const handleNameSubmit = ({ name }) => {
    console.log('NameForm submitted:', { name });
    setGuestName(name);
    sessionStorage.setItem('guestName', name);
    console.log('Saved to sessionStorage:', {
      guestName: sessionStorage.getItem('guestName')
    });
    document.title = `Thiệp mời • ${name}`;
    setCurrentScreen(SCREENS.INVITATION);
  };

  const handleAttend = () => {
    setCurrentScreen(SCREENS.THANK_YOU);
  };

  const handleDecline = () => {
    setCurrentScreen(SCREENS.QR_CODE);
  };

  const handleBack = () => {
    setCurrentScreen(SCREENS.INVITATION);
  };

  const handleBackToEnvelope = () => {
    setCurrentScreen(SCREENS.ENVELOPE);
  };

  return (
    <div className="app-container">
      {currentScreen === SCREENS.ENVELOPE && (
        <Envelope onOpen={handleEnvelopeOpen} />
      )}
      
      {currentScreen === SCREENS.NAME_FORM && (
        <NameForm 
          onSubmit={handleNameSubmit}
          initialName={guestName}
        />
      )}
      
      {currentScreen === SCREENS.INVITATION && (
        <InvitationScreen
          guestName={guestName}
          guestEmail={guestEmail}
          onAttend={handleAttend}
          onDecline={handleDecline}
          onBack={handleBackToEnvelope}
        />
      )}
      
      {currentScreen === SCREENS.THANK_YOU && (
        <ThankYouScreen onBack={handleBack} />
      )}
      
      {currentScreen === SCREENS.QR_CODE && (
        <QRCodeScreen onBack={handleBack} />
      )}
    </div>
  );
}

export default App;
