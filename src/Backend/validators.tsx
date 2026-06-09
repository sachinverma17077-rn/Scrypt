import SimpleToast from 'react-native-simple-toast';


const showToast = (message: string) => {
  SimpleToast.show(message, SimpleToast.SHORT);
};

export const VALIDATE = {
  EMAIL:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  ALPHABET_ONLY: /^[a-zA-Z\s]*$/,
  NUMBER: /[0-9]$/,
  MOBILE: /^[0-9]{1,20}$/,
  STREET: /^[a-zA-Z0-9 '-.~!@#$%^&*()_+={}[\];':"<>,.\s]*$/,
  PASSWORD:
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  USERNAME: /^[a-zA-Z0-9_.-]*$/,
  URL: /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i,
  BACKSPACE: /^(?:[a-zA-Z0-9._]|[\b])+$/,
};

type ValidationResult = string | null;
type BooleanValidationResult = boolean;

export const validators = {
  checkAlphabet: (
    name: string,
    value: string,
    min: number = 2,
    max: number = 30,
  ): ValidationResult => {
    if (value) {
      if (!VALIDATE.ALPHABET_ONLY.test(value)) {
        return `${name} is invalid`;
      } else if (value.length < min || value.length > max) {
        return `${name} must be between ${min} to ${max} characters.`;
      }
      return null;
    }
    return `${name} is required.`;
  },

  checkUsername: (
    name: string,
    value: string,
    min: number = 5,
    max: number = 30,
  ): ValidationResult => {
    if (value) {
      if (!VALIDATE.USERNAME.test(value)) {
        return `${name} is invalid`;
      } else if (value.length < min || value.length > max) {
        return `${name} must be between ${min} to ${max} characters.`;
      }
      return null;
    }
    return `${name} is required.`;
  },

  checkEmail: (
    name: string,
    value: string,
  ): ValidationResult => {
    if (value) {
      return VALIDATE.EMAIL.test(value)
        ? null
        : `${name} is invalid`;
    }
    return `${name} is required`;
  },

  checkNumber: (
    name: string,
    value: string,
  ): ValidationResult => {
    if (value) {
      return VALIDATE.MOBILE.test(value)
        ? null
        : `${name} is invalid`;
    }
    return `${name} is required`;
  },

  checkPhoneNumberWithFixLength: (
    name: string,
    max: number = 10,
    value: string,
  ): BooleanValidationResult => {
    if (value) {
      if (!VALIDATE.MOBILE.test(value)) {
        showToast(`${name} is invalid`);
        return false;
      }

      if (value.length !== max) {
        showToast(`${name} should be ${max} digits.`);
        return false;
      }

      return true;
    }

    showToast(`${name} is required`);
    return false;
  },

  checkOptionalPhoneNumberWithFixLength: (
    name: string,
    max: number = 10,
    value?: string,
  ): BooleanValidationResult => {
    if (!value) return true;

    if (!VALIDATE.MOBILE.test(value)) {
      showToast(`${name} is invalid`);
      return false;
    }

    if (value.length !== max) {
      showToast(`${name} should be ${max} digits.`);
      return false;
    }

    return true;
  },

  checkPhoneNumber: (
    name: string,
    min: number = 7,
    max: number = 15,
    value: string,
  ): ValidationResult => {
    if (value) {
      return VALIDATE.MOBILE.test(value)
        ? null
        : `${name} is invalid`;
    }

    return `${name} field should contain valid number.`;
  },

  wordCount: (
    name: string,
    value: string,
    min: number = 1,
    max: number = 300,
    words: number = 50,
  ): ValidationResult => {
    if (value) {
      if (value.length < min || value.length > max) {
        return `${name} must be between ${min} to ${max} characters.`;
      }

      if (value.trim().split(/\s+/).length > words) {
        return `${name} must be within ${words} words.`;
      }

      return null;
    }

    return `${name} is required`;
  },

  priceCheck: (
    name: string,
    value: string | number,
  ): ValidationResult => {
    if (value) {
      const stringValue = String(value);

      if (Number(value) <= 0) {
        return `${name} must be greater than zero.`;
      }

      if (stringValue.includes('.')) {
        return `${name} must not have decimal.`;
      }

      return null;
    }

    return `${name} is required`;
  },

  checkRequirePl: (
    name: string,
    value: unknown,
  ): ValidationResult => {
    return value ? null : ` ${name}`;
  },

  checkRequireImg: (
    name: string,
    value: unknown,
  ): ValidationResult => {
    return value ? null : ` ${name} image is required `;
  },

  checkNotNull: (
    name: string,
    min: number = 5,
    max: number = 40,
    value: string,
  ): BooleanValidationResult => {
    if (value) {
      if (value.length < min || value.length > max) {
        showToast(
          `${name} must be between ${min} to ${max} characters.`,
        );
        return false;
      }

      return true;
    }

    showToast(`${name} is required`);
    return false;
  },

  checkRequire: (
    name: string,
    value: unknown,
  ): ValidationResult => {
    return value ? null : ` ${name} is required `;
  },

  checkMultiple: (
    name: string,
    value: unknown[],
  ): ValidationResult => {
    return value?.length > 0
      ? null
      : `${name} is required`;
  },

  checkPassword: (
    name: string,
    value: string,
  ): string => {
    if (value) {
      if (!VALIDATE.PASSWORD.test(value)) {
        return `${name} must be of 8 characters with at least one uppercase, one lowercase, one number and one special character.`;
      }
      return '';
    }

    return `${name} is required`;
  },

  checkMatch: (
    name: string,
    value: string,
    name2: string,
    value2: string,
  ): string => {
    if (value2) {
      return value === value2
        ? ''
        : `${name} and ${name2} do not match`;
    }

    return `${name2} is required`;
  },

  checkStreet: (
    name: string,
    min: number = 7,
    max: number = 15,
    value: string,
  ): BooleanValidationResult => {
    if (value) {
      if (!VALIDATE.STREET.test(value)) {
        showToast(`${name} is invalid`);
        return false;
      }

      if (value.length < min || value.length > max) {
        showToast(
          `${name} must be between ${min} to ${max} characters.`,
        );
        return false;
      }

      return true;
    }

    showToast(`${name} is required`);
    return false;
  },

  checkUrl: (
    name: string,
    value: string,
  ): ValidationResult => {
    if (value) {
      return VALIDATE.URL.test(value)
        ? null
        : `${name} is invalid`;
    }

    return `${name} is required`;
  },

  checkChar: (
    name: string,
    value: string,
  ): ValidationResult => {
    if (value) {
      return VALIDATE.ALPHABET_ONLY.test(value)
        ? null
        : `${name} is invalid`;
    }

    return `${name} is required`;
  },
};