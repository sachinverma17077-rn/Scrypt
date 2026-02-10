import AsyncStorage from '@react-native-async-storage/async-storage';
import SimpleToast from 'react-native-simple-toast';
import axios from 'axios';
import { getAsyncStorage, removeAsyncStorage } from '../Utils/AsyncStorage';
import { BASE_URL } from './env';
import { getLatLongUrl, GOOGLE_API_KEY, place_api } from './api_routes';
import { createRef } from 'react';
import { print } from './print';
import Variables from '../Utils/Variables';
import localization from '../Constants/localization';
import { useSelector } from 'react-redux';

axios.defaults.timeout = 15000;
export const toastRef = createRef()
const errorHandling = {
  validateStatus: function (status) {
    return status >= 200 && status < 501; // default
  },
};

export const API = BASE_URL;

export const statusMessage = {
  400: 'Invalid request format.',
  401: 'Invalid API Key.',
  403: 'The request is forbidden.',
  404: 'The specified resource could not be found.',
  405: 'You tried to access the resource with an invalid method.',
  500: 'We had a problem with our server. Try again later.',
  503: "We're temporarily offline for maintenance. Please try again later.",
};

export const getToken = async () => {
  const token = await getAsyncStorage(Variables.AUTH_TOKEN);
  return token;
};

const updateUnAuthorizedError = () => {
  // handle unauthorized 
}

export const getUserData = async (field = null) => {
  const userDataRes = await AsyncStorage.getItem(Variables.USER_DATA);
  if (!field) {
    return JSON.parse(userDataRes);
  } else {
    const userData = JSON.parse(userDataRes);
    return userData[field];
  }
};

export const Toast = (message = '', type = 'normal', config = {}, hidePrevious = false) => {
  // SimpleToast.show(message, duration)
  if (hidePrevious) {
    toastRef.current?.hideAll();
  }
  toastRef.current?.show(message, {
    type,
    duration: 1800,
    placement: 'bottom',
    ...config
  })
}

const responseBack = (data, msg, status) => {
  return {
    data,
    msg,
    status,
  };
};

export const logoutHandler = async () => {
  await AsyncStorage.clear()
  return true;
};

const printAPIDetails = (token, url, body) => {
  print('TOKEN : ', token);
  print('URL : ', url);
  print('BODY : ', body);
  return;
};

export const POST_FORMDATA = async (
  route,
  body,
  onSuccess = () => { },
  onError = () => { },
  onFail = () => {
    SimpleToast.show('Check Network, Try Again.', SimpleToast.SHORT);
  },
) => {
  const token = await getToken();
  printAPIDetails('---body--', API + route, body?._parts || body)
  try {
    await axios({
      method: 'post',
      url: `${API}${route}`,
      data: body,
      headers: {
        'Content-Type': 'multipart/form-data',
        // authorization: `Bearer ${token}`,
        // 'Accept': 'application/json',
        'Accept-Language': localization.getLanguage(),
      },
      ...errorHandling,
    })
      .then(res => {
        console.log('-API-res---', res);
        if (res?.status == 200 || res?.status == 201) {
          onSuccess(res?.data);
        } else {
          if (res?.status == 401) {
            // updateUnAuthorizedError();
          }
          onError({ data: null, message: statusMessage[res.status], status: false });
        }
      })
      .catch(err => {
        console.error(err, "----error ,api catch");
        onError(err);
      });
  } catch (error) {
    print('FAIL', error);
    onFail({ data: null, msg: 'Network Error', status: 'error' });
    return { data: null, msg: 'Network Error', status: 'error' };
  }
};

export const POST_FORMDATA_TOKEN = async (
  route,
  body,
  onSuccess = () => { },
  onError = () => { },
  onFail = () => {
    SimpleToast.show('Check Network, Try Again.', SimpleToast.SHORT);
  },
) => {
  const token = await getToken();
  printAPIDetails(API + route, body?._parts || body)
  try {
    await axios({
      method: 'post',
      url: `${API}${route}`,
      data: body,
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${token}`,
        // 'Accept': 'application/json',
        'Accept-Language': localization.getLanguage(),
      },
      ...errorHandling,
    })
      .then(res => {
        console.log('--res--', res);

        if (res?.status == 200 || res?.status == 201) {
          onSuccess(res?.data);
        } else {
          if (res?.status == 401) {
            // updateUnAuthorizedError();
          }
          onError(res);
        }
      })
      .catch(err => {
        console.error("----error ,api catch", err);
        onError(err);
      });
  } catch (error) {
    print('FAIL', error);
    onFail({ data: null, msg: 'Network Error', status: 'error' });
    return { data: null, msg: 'Network Error', status: 'error' };
  }
};

export const POST = async (
  route,
  body = {},
  onSuccess = () => { },
  onError = () => { },
  onFail = () => {
    SimpleToast.show('Check Network, Try Again.', SimpleToast.SHORT);
  },
) => {
  console.log(body, `${API}${route}`);
  printAPIDetails(null, `${API}${route}`, body)
  try {
    axios({
      method: 'post',
      url: `${API}${route}`,
      data: body,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Language': localization.getLanguage()
      },
      // ...errorHandling,
      validateStatus: function (status) {
        return status >= 200 && status < 501; // default
      },
    })
      .then(res => {

        if (res?.status == 200) {
          if (!!res?.data?.status) {

            onSuccess(res?.data);
          } else {
            onError(res?.data);
          }
        } else {
          onError(res);
        }
      })
      .catch(err => {

        console.error(err);
        onError(err);
      });
  } catch (error) {
    console.log(error, '==');
    onFail({ data: null, msg: 'Network Error', status: 'error' });
    return { data: null, msg: 'Network Error', status: 'error' };
  }
};

export const GET = async (
  route,
  onSuccess = () => { },
  onError = () => { },
  headers = {},
  onFail = () => {
    SimpleToast.show('Check Network, Try Again.', SimpleToast.SHORT);
  },
) => {
  // const token = await getToken();
  console.log("My data is here", `${API}${route}`)
  printAPIDetails('NO TOKEN', route, 'No Body');
  try {
    axios({
      method: 'get',
      url: `${API}${route}`,
      headers: {
        authorization: `Bearer ${getToken()}`,
        // 'Content-Type': 'multipart/form-data',
        'Accept-Language': localization.getLanguage(),
        Accept: 'application/json'
      },
      ...errorHandling,
    })
      .then(res => {
        console.log('----APIRESSSS-->>', res?.status);
        if (res?.status == 200) {
          onSuccess(res?.data);
        } else {
          if (res.status in statusMessage) {
            onError({ data: null, message: statusMessage[res.status], status: false })
          }
          onError(res);
        }
      })
      .catch(err => {
        console.log('----err-->>', err);

        onError(err);
      });
  } catch (error) {
    console.log('----error-->>', error);

    onFail({ data: null, msg: 'Network Error', status: 'error' });
    return { data: null, msg: 'Network Error', status: 'error' };
  }
};

export const POST_WITH_TOKEN = async (
  route,
  body = {},
  onSuccess = () => { },
  onError = () => { },
  onFail = () => {
    SimpleToast.show('Check Network, Try Again.', SimpleToast.SHORT);
  },
) => {
  const token = await getToken();
  printAPIDetails(token, route, body)
  try {
    await axios({
      method: 'post',
      url: `${API}${route}`,
      data: body,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Language': localization.getLanguage()
      },
      ...errorHandling,
    })
      .then(res => {
        if (res?.status == 200) {
          onSuccess(res?.data);
        } else {
          if (res?.status == 401) {
            updateUnAuthorizedError();
          }
          onError(res);
        }
      })
      .catch(err => {
        console.error(err);
        onError(err);
      });
  } catch (error) {
    onFail({ data: null, msg: 'Network Error', status: 'error' });
    return { data: null, msg: 'Network Error', status: 'error' };
  }
};

export const PLACE_API = (
  route,
  onSuccess = () => { },
  onError = () => { },
  headers = {},
  onFail = () => {
    SimpleToast.show('Check Network, Try Again.', SimpleToast.SHORT);
  },
) => {
  try {
    axios({
      method: 'get',
      url: `${place_api}key=${GOOGLE_API_KEY}&input=${route}`,
      headers: {
        'Accept-Language': localization.getLanguage(),
        ...headers
      }
    })
      .then(res => {
        if (res?.status == 200) {
          onSuccess(res?.data);
        } else {
          onError(res);
        }
      })
      .catch(err => {
        onError(err);
      });
  } catch (error) {
    onFail({ data: null, msg: 'Network Error', status: 'error' });
    return { data: null, msg: 'Network Error', status: 'error' };
  }
}

export const GET_LET_LONG = (
  route,
  onSuccess = () => { },
  onError = () => { },
  headers = {},
  onFail = () => {
    SimpleToast.show('Check Network, Try Again.', SimpleToast.SHORT);
  },
) => {
  try {
    axios({
      method: 'get',
      url: `${getLatLongUrl}placeid=${route}&key=${GOOGLE_API_KEY}`,
    })
      .then(res => {
        if (res?.status == 200) {
          onSuccess(res?.data);
        } else {
          onError(res);
        }
      })
      .catch(err => {
        onError(err);
      });
  } catch (error) {
    onFail({ data: null, msg: 'Network Error', status: 'error' });
    return { data: null, msg: 'Network Error', status: 'error' };
  }
}

export const GET_WITH_TOKEN = async (
  route,
  onSuccess = () => { },
  onError = () => { },
  onFail = () => {
    SimpleToast.show('Check Network, Try Again.', SimpleToast.SHORT);
  },
  headers = {},
  status = () => { },
) => {
  const token = await getToken();
  // const token = useSelector(State => State?.Token);
  // console.log('--token--', token);

  printAPIDetails(token, route, 'No Body');
  // console.log('USER TOKEN', token);
  try {
    await axios({
      method: 'get',
      url: `${API}${route}`,
      headers: {
        authorization: `Bearer ${token}`,
        'Accept-Language': localization.getLanguage(),
        ...headers,
      },
      ...errorHandling,
    })
      .then(res => {
        console.log('-API-ress-->>', res?.status);
        if (res?.status == 200) {
          onSuccess(res?.data);
          return res?.data
        } else {
          if (res?.status == 401) {
            // updateUnAuthorizedError();
          }
          if (statusMessage[res?.status]) {
            Toast(`${statusMessage[res?.status]}`, 'danger')
          }
          onError({ data: null, message: statusMessage[res.status], status: false });
          return res
        }
      })
      .catch(err => {
        onError(err);
        console.log('--err--', err);
        Toast(`${statusMessage[err?.status]}`, 'danger')
        return err
      });
    return
  } catch (error) {
    console.log(error);
    onFail({ data: null, msg: 'Network Error', status: 'error', error });
    return { data: null, msg: 'Network Error', status: 'error' };
  }
};

export const DELETE_WITH_TOKEN = async (
  route,
  body = {},
  onSuccess = () => { },
  onError = () => { },
  onFail = () => {
    SimpleToast.show('Check Network, Try Again.', SimpleToast.SHORT);
  },
  headers = {},
) => {
  try {
    const token = await getToken();
    axios({
      method: 'delete',
      url: `${API}${route}`,
      data: body,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Language': localization.getLanguage(),
        ...headers,
      },
      ...errorHandling,
    })
      .then(res => {
        console.log('--res-API-', res?.status);

        if (res?.status == 200) {
          onSuccess(res?.data);
        } else {
          if (res?.status == 401) {
            updateUnAuthorizedError();
          }
          onError({ data: null, message: statusMessage[res.status], status: false });
        }
      })
      .catch(err => {
        onError(err);
      });
  } catch (error) {
    onFail({ data: null, msg: 'Network Error', status: 'error', error });
    return { data: null, msg: 'Network Error', status: 'error' };
  }
};

export const PUT_FORM_DATA = async (
  route,
  body,
  onSuccess = () => { },
  onError = () => { },
  onFail = () => {
    SimpleToast.show('Check Network, Try Again.', SimpleToast.SHORT);
  },
) => {
  console.log(`${API}${route}`);
  const token = await getToken();
  try {
    axios({
      method: 'put',
      url: `${API}${route}`,
      data: body,
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${token}`,
        'Accept-Language': localization.getLanguage()
      },
      ...errorHandling,
    })
      .then(res => {
        if (res?.status == 200 || res?.status == 201) {
          onSuccess(res?.data);
        } else {
          if (res?.status == 401) {
            updateUnAuthorizedError();
          }
          onError(res);
        }
      })
      .catch(err => {
        console.error(err);
        onError(err);
      });
  } catch (error) {
    print('FAIL', error);
    onFail({ data: null, msg: 'Network Error', status: 'error' });
    return { data: null, msg: 'Network Error', status: 'error' };
  }
};

export const PUT_WITH_TOKEN = async (
  route,
  body = {},
  onSuccess = () => { },
  onError = () => { },
  onFail = () => {
    SimpleToast.show('Check Network, Try Again.', SimpleToast.SHORT);
  },
) => {
  const token = await getToken();
  try {
    axios({
      method: 'put',
      url: `${API}${route}`,
      data: body,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept-Language': localization.getLanguage()
      },
      ...errorHandling,
    })
      .then(res => {
        if (res?.status == 200) {
          onSuccess(res?.data);
        } else {
          if (res?.status == 401) {
            updateUnAuthorizedError();
          }
          onError(res);
        }
      })
      .catch(err => {
        console.error(err);
        onError(err);
      });
  } catch (error) {
    onFail({ data: null, msg: 'Network Error', status: 'error' });
    return { data: null, msg: 'Network Error', status: 'error' };
  }
};

export function onErrorFound(res, onError) {
  const errorResponse = responseBack(null, statusMessage[res.status], 'error');
  onError(errorResponse);
  return errorResponse;
}
