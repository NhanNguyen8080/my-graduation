(function () {
  const SCREENS = {
    name: document.getElementById('screen-name'),
    invite: document.getElementById('screen-invite'),
    attend: document.getElementById('screen-attend'),
    qr: document.getElementById('screen-qr'),
  };

  const nameForm = document.getElementById('name-form');
  const guestInput = document.getElementById('guestName');
  const guestDisplay = document.getElementById('guest-display');
  const btnAttend = document.getElementById('btn-attend');
  const btnDecline = document.getElementById('btn-decline');
  const backButtons = document.querySelectorAll('[data-back]');
  const envelope = document.getElementById('envelope');

  const PHONE = '0338882943';
  const RSVP_ENDPOINT = 'https://script.google.com/macros/s/AKfycbz-eHDgcwt1eQg8izutz5e0hvVT1HCqJcQvujRXxxWnuc72ooLDSm272VsXy8Yg3_8gTQ/exec';

  async function postRSVP(status) {
    const name = (sessionStorage.getItem('guestName') || guestInput.value || '').trim();
    if (!name || !RSVP_ENDPOINT) return;
    const payload = {
      name,
      status, // 'attend' | 'decline'
      at: new Date().toISOString(),
      ua: navigator.userAgent,
    };
    try {
      const res = await fetch(RSVP_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'no-cors',
      });
      // no-cors hides response; assume success
    } catch (_) {
      // swallow errors; UI should not block
    }
  }

  function show(id) {
    Object.values(SCREENS).forEach(s => s.classList.remove('is-active'));
    SCREENS[id].classList.add('is-active');
  }

  function setGuestName(name) {
    guestDisplay.textContent = name;
    document.title = `Thiệp mời • ${name}`;
    sessionStorage.setItem('guestName', name);
  }

  function initFromSession() {
    const saved = sessionStorage.getItem('guestName');
    if (saved) {
      setGuestName(saved);
      show('invite');
    }
  }

  // Open envelope on click
  if (envelope) {
    envelope.addEventListener('click', function() {
      if (!envelope.classList.contains('opened')) {
        envelope.classList.add('opened');
        // Focus input after animation
        setTimeout(() => {
          guestInput.focus();
        }, 600);
      }
    });
  }

  nameForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = (guestInput.value || '').trim();
    if (!name) {
      guestInput.focus();
      return;
    }
    setGuestName(name);
    show('invite');
  });

  btnAttend.addEventListener('click', function () {
    postRSVP('attend');
    show('attend');
  });

  btnDecline.addEventListener('click', function () {
    postRSVP('decline');
    show('qr');
  });

  backButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      show('invite');
    });
  });

  // Deep link: allow pre-filling name via ?name=
  const params = new URLSearchParams(window.location.search);
  const prefill = (params.get('name') || '').trim();
  if (prefill) {
    guestInput.value = prefill;
  }

  initFromSession();
})();


