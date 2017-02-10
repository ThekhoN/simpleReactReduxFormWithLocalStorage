export const localStorageSupported = (type) => {
  try {
    var storage = window[type],
        x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch(e) {
    return false;
  }
}

export const deleteLocalStorage = () => {
  if (localStorageSupported('localStorage')) {
    localStorage.setItem('userName', '')
    localStorage.setItem('userEmail', '')
    localStorage.setItem('userMobile', '')
    localStorage.setItem('userTime', '')
    console.info('deleted LocalStorage. . .')
  }
  else {
    console.error('localStorage NOT supported, Failed to retrieve previous entry. . .')
    return false;
  }
}


export const getSavedSettings = () => {
  let savedUserName, savedUserTime, savedUserEmail, savedUserMobile;
  if (localStorageSupported('localStorage')) {
    savedUserName = localStorage.getItem('userName')
    savedUserEmail = localStorage.getItem('userEmail')
    savedUserMobile = localStorage.getItem('userMobile')
    savedUserTime = localStorage.getItem('userTime')
  }
  else {
    console.error('localStorage NOT supported, Failed to retrieve previous entry. . .')
  }
  return {
    userName: savedUserName ? savedUserName : '',
    userEmail: savedUserEmail ? savedUserEmail : '',
    userMobile: savedUserMobile ? savedUserMobile : '',
    userTime: savedUserTime ? savedUserTime : ''
  }
}
