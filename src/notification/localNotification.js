import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import  {Platform} from 'react-native';
import {notificationOpen} from './notificationAction';

class LocalNotificationService {

  configure = () => {
    this.createChannel();
    this.configureNotification();
  }

  createChannel = () =>{
    let config = {
      channelId: "channel-id", // (required)
      channelName: "My channel", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      playSound: true, // (optional) default: true
      allowWhileIdle:true,
      // soundName: (Platform.OS=='ios')?"rushs.wav":"rushs", // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    };

    PushNotification.createChannel(config,(created) => {});
  }

  configureNotification = () =>{
    let config = {
      onRegister: function (token) {},
      onNotification: function (notification) {
          if (notification.userInteraction) {
            notificationOpen(notification)
          }
        },
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
        popInitialNotification: false,
        requestPermissions: true,
    }

    PushNotification.configure(config);
  }

  unRegister = () => {
    PushNotification.unregister()
  }

  showlocalNotification = ({notification,data}) => {
    console.log(notification, '?????');
    let config = {
      title: notification?.title,
      message: notification?.message || notification?.body,
      userInfo: data,
      playSound: true,
      // soundName:(Platform.OS=='ios')?"rushs.wav":'rushs'
    }

    if(Platform.OS == 'android') {
      config.channelId = "channel-id";
      config.data = data;
      config.message =  notification?.body;
    }
    
    PushNotification.localNotification(config);
  }

  cancelAllLocalNotifications = () => {
    if(Platform.OS === 'ios'){
      PushNotificationIOS.removeAllDeliveredNotifications();
    }else{
      PushNotification.cancelAllLocalNotifications();
    }
  }

  clearNotificationBadge = () =>{
    if(Platform.OS=='ios') {
      PushNotificationIOS.getApplicationIconBadgeNumber((num)=>{ // get current number
        if(num >= 1){
            PushNotificationIOS.setApplicationIconBadgeNumber(0) //set number to 0
        }
      });
    }
  }

  removeAllDeliveredNotificationByID = (notificationId) => {
    PushNotification.cancelLocalNotifications({id:`${notificationId}`})
  }

}

export const localNotificationService = new LocalNotificationService()




// import PushNotificationIOS from '@react-native-community/push-notification-ios';

// import { Platform } from 'react-native';

// import React from 'react';

// export const navigation = React.createRef();

// class LocalNotificationService {

//   configure = () => {

//     PushNotification.createChannel(

//       {

//         channelId: 'channel-id', // (required)

//         channelName: 'My channel', // (required)

//         channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.

//         playSound: true, // (optional) default: true

//         allowWhileIdle: true,

//         soundName: 'default', // (optional) See soundName parameter of localNotification function

//         importance: 4, // (optional) default: 4. Int value of the Android notification importance

//         vibrate: true, // (optional) default: true. Creates the default vibration patten if true.

//         vibration: 3000,

//       },

//       created => console.log('createChannel returned', `${created}`), // (optional) callback returns whether the channel was created, false means it already existed.

//     );

//     PushNotification.configure({

//       // (optional) Called when Token is generated (iOS and Android)

//       onRegister: function (token) {

//         // console.log("[LocalNotificationService] onRegister:", token);

//       },

//       onAction: function (notification) {

//         console.log('ACTION:', notification.action);

//         console.log('NOTIFICATION:', notification);

//         // process the action

//       },

//       onNotification: function (notification) {

//         console.log('[LocalNotificationService] onNotification:', notification);
//         // alert('dd');

//         var data = {

//           channelId: 'channel-id',

//           autoCancel: true,

//           title: notification.data.title,

//           message: notification.data.message,

//           vibrate: true,

//           vibration: 2000,

//           playSound: true,

//           allowWhileIdle: true,

//           soundName: 'default',

//           // add id and type //

//           typeId: notification?.data?.typeId || notification?.data?.chatId,

//           type: notification?.data?.type,

//           // add id and type //

//           // popInitialNotification: false,

//           requestPermissions: true,

//           // actions: '["Reject", "Accept"]',

//           // action:true,

//           invokeApp: false,

//         };

//       },

//       permissions: {

//         alert: true,

//         badge: true,

//         sound: true,

//       },

//       popInitialNotification: false,

//       /**
      
//       * (optional) default: true
      
//       * - Specified if permissions (ios) and token (android and ios) will requested or not,
      
//       * - if not, you must call PushNotificationsHandler.requestPermissions() later
      
//       * - if you are not using remote notification or do not have Firebase installed, use this:
      
//       * requestPermissions: Platform.OS === 'ios'
      
//       */

//       requestPermissions: true,

//     });

//   };

//   unRegister = () => {

//     PushNotification.unregister();

//   };

//   showNotification = (id, title, message, data = {}, option = {}) => {

//     console.log('show notificationsssss', id, title, message, data = {}, option = {});

//     PushNotification.localNotification({

//       ...this.buildAndroidNotification(id, title, message, data, option),

//       ...this.buildIOSNotification(id, title, message, data, option),

//       channelId: 'channel-id',

//       title: title || '',

//       message: message || '',

//       playSound: option.playSound || true,

//       soundName: 'default',

//       vibrate: true,

//       vibration: 2000,

//       // actions: '["Reject", "Accept"]',

//       userInteraction: false, //Boolen

//     });

//   };

//   buildAndroidNotification = (id, title, message, data = {}, option = {}) => {

//     return {

//       autoCancel: true,

//       largeIcon: option.largeIcon || 'ic_launcher',

//       smallIcon: option.smallIcon || 'ic_stat_ic_notification',

//       bigText: message || '', // (optional) default: "message" prop

//       subText: title || '',

//       vibrate: option.vibrate || true, // (optional) default: true

//       vibration: option.vibration || 2000,

//       priority: option.priority || 'high',

//       importance: option.importance || 'high',

//       data: data,

//     };

//   };

//   buildIOSNotification = (id, title, message, data = {}, option = {}) => {

//     return {

//       alertAction: option.alertAction || 'view',

//       category: option.category || '',

//       userInfo: {

//         id: id,

//         item: data,

//       },

//     };

//   };

//   cancelAllLocalNotifications = () => {

//     if (Platform.OS === 'ios') {

//       PushNotificationIOS.removeAllDeliveredNotifications();

//     } else {

//       PushNotification.cancelAllLocalNotifications();

//     }

//   };

//   removeAllDeliveredNotificationByID = notificationId => {

//     console.log("[LocalNotificationService] removeAllDeliveredNotificationByID:", notificationId);

//     PushNotification.cancelAllLocalNotifications();

//   };

// }

// export const localNotificationService = new LocalNotificationService();