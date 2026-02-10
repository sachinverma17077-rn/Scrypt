import { Dimensions, Platform } from 'react-native';

// import Toast from 'react-native-simple-toast';
export const RFV = e => {
  // return RFValue(e, Dimensions.get('screen').height);
  return e;
};
export const regex = {
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  // phoneNumber: /^(\+\d{1,3}[- ]?)?\d{9}$/,
  phoneNumber: /^(0|[1-9][0-9]*)$/,
  // phoneNumber: /^\+27[0-9]{9}$/,
  // phoneNumber: /^(+27|0)[6-8][0-9]{8}$/,
  // phoneNumber: /^((?!(0))[0-9]{9})$/,
  // phoneNumber: /^(\+27|0)[6-8][0-9]{8}$/,
};
export const DefaultToast = title => {
  return Toast.show(title);
};
export const formatError = obj => {
  let errorsData = {};
  for (const field in obj) {
    if (Object.hasOwnProperty.call(obj, field)) {
      errorsData[field] = '';
    }
  }
  return errorsData;
};
export const parseValues = data => {
  let parsedData = {};
  for (const field in data) {
    if (Object.hasOwnProperty.call(data, field)) {
      const value = data[field].value;
      parsedData[field] = value;
    }
  }
  return parsedData;
};
export const isValidEmail = email => regex.email.test(email);
export const isValidPassword = email => regex.email.test(email);
export const isValidPhone = phone => regex.phoneNumber.test(phone);

export const isValidValue = ({
  value = '',
  required = true,
  type = '',
  minimum = 0,
  maximum = 1000,
}) => {
  if (required) {
    if (!value) {
      return 'Please Enter Some Value';
    } else if (type === 'email') {
      return !isValidEmail(value) ? 'Please Enter Valid Email!' : '';
    } else if (type === 'phone') {
      return !isValidPhone(value) ? 'Please Enter Valid Phone Number!' : '';
    } else if (value.length < minimum) {
      return `Minimum length should be ${minimum}`;
    } else if (value.length > maximum) {
      return `Maximum length should be ${maximum}`;
    } else {
      return '';
    }
  } else {
    return '';
  }
};

////////////
export const isValidForm = (form = {}) => {
  let valid = true;
  for (const field in form) {
    if (Object.hasOwnProperty.call(form, field)) {
      const error = form[field];
      valid = valid && !error;
    }
  }
  return valid;
};
/////////////

export function getRegionForCoordinates(points) {
  // points should be an array of { latitude: X, longitude: Y }
  let minX, maxX, minY, maxY;

  // init first point
  (point => {
    minX = point.latitude;
    maxX = point.latitude;
    minY = point.longitude;
    maxY = point.longitude;
  })(points[0]);

  // calculate rect
  points.map(point => {
    minX = Math.min(minX, point.latitude);
    maxX = Math.max(maxX, point.latitude);
    minY = Math.min(minY, point.longitude);
    maxY = Math.max(maxY, point.longitude);
  });

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const deltaX = maxX - minX;
  const deltaY = maxY - minY;
  return {
    latitude: +midX,
    longitude: +midY,
    latitudeDelta: +deltaX,
    longitudeDelta: +deltaY,
  };
}

export const isIos = Platform.OS === 'ios';
