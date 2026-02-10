import SimpleToast from 'react-native-simple-toast';

export const VALIDATE = {
  EMAIL:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  ALPHABET_ONLY: /^[a-zA-Z \s]*$/,
  NUMBER: /[0-9]$/,
  MOBILE: /^[0-9]{1,20}$/,
  STREET: /^[a-zA-Z0-9 '-.~!@#$%^&*()_+={}[];':"<>,.\s]*$/,
  PASSWORD: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  USERNAME: /^[a-zA-Z0-9_.-]*$/,
  URL: /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i,
  BACKSPACE: /^(?:[a-zA-Z0-9._]|[\b])+$/,
};

export const validators = {
  checkAlphabet: (name, value, min, max) => {
    var min = min || 2;
    var max = max || 30;
    if (value) {
      if (!VALIDATE.ALPHABET_ONLY.test(value)) {
        return `${name} is invalid`;
      } else if (value.length < min || value.length > max) {
        return `${name} must be between ${min} to ${max} characters.`;
      }
      return null;
    } else {
      return `${name} is required.`;
    }
  },

  checkUsername: (name, value, min, max) => {
    var min = min || 5;
    var max = max || 30;
    if (value) {
      if (!VALIDATE.USERNAME.test(value)) {
        return `${name} is invalid`;
      } else if (value.length < min || value.length > max) {
        return `${name} must be between ${min} to ${max} characters.`;
      }
      return null;
    } else {
      return `${name} is required.`;
    }
  },

  checkEmail: (name, value) => {
    if (value) {
      if (!VALIDATE.EMAIL.test(value)) {
        return `${name} is invalid`;
      } else {
        return null;
      }
    } else {
      return `${name} is required`;
    }
  },

  checkNumber: (name, value) => {
    if (value) {
      if (!VALIDATE.MOBILE.test(value)) {
        return `${name} is invalid`;
      }
      return null;
    } else {
      return `${name} is required`;
    }
  },

  checkPhoneNumberWithFixLength: (name, max, value) => {
    var max = max || 10;
    if (value) {
      if (!VALIDATE.MOBILE.test(value)) {
        SimpleToast(`${name} is invalid`);
        return false;
      } else if (value.length != max) {
        SimpleToast(`${name} should be ${max} digits.`);
        return false;
      }
      return true;
    } else {
      SimpleToast(`${name} is required`);
      return false;
    }
  },

  checkOptionalPhoneNumberWithFixLength: (name, max, value) => {
    var max = max || 10;
    if (value) {
      if (!VALIDATE.MOBILE.test(value)) {
        SimpleToast(`${name} is invalid`);
        return false;
      } else if (value.length != max) {
        SimpleToast(`${name} should be ${max} digits.`);
        return false;
      }
      return true;
    } else {
      return true;
    }
  },

  checkPhoneNumber: (name, min, max, value) => {
    var min = min || 7;
    var max = max || 15;
    if (value) {
      if (!VALIDATE.MOBILE.test(value)) {
        return `${name} is invalid`;
      }
      return null;
    } else {
      return `${name} field should contain valid number.`;
    }
  },

  wordCount: (name, value, min, max, words) => {
    var min = min || 1;
    var max = max || 300;
    var words = words || 50;
    if (value) {
      if (value.length < min || value.length > max) {
        return `${name} must be between ${min} to ${max} characters.`;
      }
      if (value.trim().split(/\s+/).length > words) {
        return `${name} must be within ${words} words.`;
      }
      return null;
    } else {
      return `${name} is required`;
    }
  },

  priceCheck: (name, value) => {
    if (value) {
      var test = value.split('');
      if (value <= 0) {
        return `${name} must be greater than zero.`;
      } else if (test.indexOf('.') >= 0) {
        return `${name} must not have decimal.`;
      }
      return null;
    } else {
      return `${name} is required`;
    }
  },

  checkRequirePl: (name, value) => {
    if (value) {
      return null;
    } else {
      return ` ${name}`;
    }
  },

  checkRequireImg: (name, value) => {
    if (value) {
      return null;
    } else {
      return ` ${name} image is required `;
    }
  },

  checkNotNull: (name, min, max, value) => {
    var min = min || 5;
    var max = max || 40;
    if (value) {
      if (value.length < min || value.length > max) {
        SimpleToast(`${name} must be between ${min} to ${max} characters.`);
        return false;
      }
      return true;
    } else {
      SimpleToast(`${name} is required`);
      return false;
    }
  },

  checkRequire: (name, value) => {
    if (value) {
      return null;
    } else {
      return ` ${name} is required `;
    }
  },

  checkMultiple: (name, value) => {
    if (value?.length > 0) {
      return null;
    } else {
      return `${name} is required`;
    }
  },

  checkPassword: (name, value) => {
    if (value) {
      if (!VALIDATE.PASSWORD.test(value)) {
        return `${name} must be of 8 characters with at least one uppercase, one lowercase, one number and one special character.`;
      }
      return '';
    } else {
      return `${name} is required`;
    }
  },

  checkMatch: (name, value, name2, value2) => {
    if (value2) {
      if (value === value2) {
        return '';
      } else {
        return `${name} and ${name2} do not match`;
      }
    } else {
      return `${name2} is required`;
    }
  },

  checkStreet: (name, min, max, value) => {
    var min = min || 7;
    var max = max || 15;
    if (value) {
      if (VALIDATE.STREET.test(value)) {
        SimpleToast(`${name} is invalid`);
        return false;
      } else if (value.length < min || value.length > max) {
        SimpleToast(`${name} must be between ${min} to ${max} characters.`);
        return false;
      }
      return true;
    } else {
      SimpleToast(`${name} is required`);
      return false;
    }
  },

  checkUrl: (name, value) => {
    if (value) {
      if (!VALIDATE.URL.test(value)) {
        return `${name} is invalid`;
      }
      return null;
    } else {
      return `${name} is required`;
    }
  },

  checkChar: (name, value) => {
    if (value) {
      if (!VALIDATE.ALPHABET_ONLY.test(value)) {
        return `${name} is invalid`;
      } else {
        return null;
      }
    } else {
      return `${name} is required`;
    }
  },
};
