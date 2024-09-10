export default function showPolicy() {
  // const cookieStorage = {
  //   getItem: item => {
  //     const cookies = document.cookie
  //       .split(';')
  //       .map(cookie => cookie.split('='))
  //       .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
  //     return cookies[item];
  //   },
  //   setItem: (item, value) => {
  //     document.cookie = `${item}=${value};`;
  //   },
  // };

  // const storageType = cookieStorage;
  const storageType = sessionStorage;
  const consentPropertyName = 'jdc_consent';
  const shouldShowPopup = () =>
    !JSON.parse(storageType.getItem(consentPropertyName));
  const saveToStorage = usersolution =>
    storageType.setItem(consentPropertyName, usersolution);

  window.onload = () => {
    const acceptFn = () => {
      saveToStorage(true);
      consentPopup.classList.add('hidden');
    };
    const rejectFn = () => {
      saveToStorage(false);
      consentPopup.classList.add('hidden');
    };

    const consentPopup = document.getElementById('consent-popup');
    const acceptBtn = document.getElementById('accept-privacy');
    const rejectBtn = document.getElementById('reject-privacy');
    acceptBtn.addEventListener('click', acceptFn);
    rejectBtn.addEventListener('click', rejectFn);

    if (shouldShowPopup() || shouldShowPopup() === null) {
      setTimeout(() => {
        consentPopup.classList.remove('hidden');
      }, 2000);
    }
  };
}
