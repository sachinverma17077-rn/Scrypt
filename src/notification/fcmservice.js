import messaging from "@react-native-firebase/messaging";
import { Alert, Platform } from "react-native";
import { localNotificationService } from "./localNotification";
import {
    navigate,
    navigationRef,
    notificationOpen,
} from "./notificationAction";
import SimpleToast from "react-native-simple-toast";
import React, { useEffect, useState } from "react";
import { print } from "../Backend/print";

const FCMServiceComp = ({ isReady = false }) => {
    let messageListener = null;
    const [state, setState] = useState(null);
    useEffect(() => {
        let time;
        if (navigationRef.current && isReady && state) {
            time = setTimeout(() => {
                navigate('Dashboard', {})
                // if (state?.data?.pn_type === 'booking_confirmed_to_customer') {
                //     setTimeout(() => {
                //         navigate('TabTrips', {})
                //     }, 3000);
                // } else {
                //     setTimeout(() => {
                //         navigate('Notification', {})
                //     }, 3000);
                // }
            }, 3000);
        }
        return () => {
            clearTimeout(time)
        }
    }, [navigationRef.current, isReady, state]);

    const register = () => {
        checkPermission();
        createNotificationListeners();

        localNotificationService.configure();

        if (Platform.OS === "ios") {
            registerAppWithFCM();
        }
    };

    const registerAppWithFCM = async () => {
        if (Platform.OS === "ios") {
            await messaging().registerDeviceForRemoteMessages();
            await messaging().setAutoInitEnabled(true);
        }
    };

    const checkPermission = () => {
        messaging()
            .hasPermission()
            .then((enabled) => {
                if (enabled) {
                    getFcmToken();
                } else {
                    requestPermission();
                }
            })
            .catch((error) => { });
    };

    const getFcmToken = () => {
        return new Promise((res) => {
            messaging()
                .getToken()
                .then((fcmToken) => {
                    if (fcmToken) {
                        print("[FCM TOKEN] => ", fcmToken);
                        res(fcmToken);
                    } else {
                        print("[FCMService] User Does not have a device token");
                    }
                })
                .catch((error) => {
                    // SimpleToaster('Please check your network connection.')
                    print("[FCMService] getToken rejected", error);
                });
        });
    };

    const requestPermission = () => {
        messaging()
            .requestPermission()
            .then(() => {
                getFcmToken();
            })
            .catch((error) => {
                print("[FCMService] Request Permission rejected", error);
            });
    };

    const deleteToken = () => {
        messaging()
            .deleteToken()
            .catch((error) => {
                print("[FCMService] Delete Token error", error);
            });
    };

    const createNotificationListeners = () => {
        //when the application is running but in background
        messaging().onNotificationOpenedApp((remoteMessage) => {
            if (remoteMessage) {
                setTimeout(() => {
                    navigate('Dashboard', {})
                }, 3000);
                // alert('2');
                // if (remoteMessage?.data?.pn_type === 'booking_confirmed_to_customer') {
                //     setTimeout(() => {
                //         navigate('TabTrips', {})
                //     }, 3000);
                // } else {
                //     setTimeout(() => {
                //         navigate('Notification', {})
                //     }, 3000);
                // }

                // setTimeout(() => {
                //     navigate("Notification", {});
                // }, 3000);

                setState(remoteMessage);
            }
        });

        //when the application is opened from a quit state.
        messaging()
            .getInitialNotification()
            .then((remoteMessage) => {
                if (remoteMessage) {

                    // if (remoteMessage?.data?.pn_type === 'booking_confirmed_to_customer') {
                    //     setTimeout(() => {
                    //         navigate('TabTrips', {})
                    //     }, 3000);
                    // } else {
                    //     setTimeout(() => {
                    //         navigate('Notification', {})
                    //     }, 3000);
                    // }
                    setTimeout(() => {
                        navigate("Dashboard");
                    }, 2000);

                    setState(remoteMessage);
                }
            });

        //forgrounnd state messages
        messageListener = messaging().onMessage(async (remoteMessage) => {
            if (remoteMessage) {
                localNotificationService.showlocalNotification(remoteMessage);
            }
        });

        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
            if (remoteMessage) {
                // onNotification(remoteMessage,false);
            }
        });

        //Triggerd When have new token
        messaging().onTokenRefresh((fcmToken) => {
            print("[FCMService] new token refresh", fcmToken);
        });
    };

    const unRegister = () => {
        if (messageListener) {
            messageListener();
        }
    };

    useEffect(() => {
        register();
        return () => {
            unRegister();
        };
    }, []);

    return <></>;
};

export default FCMServiceComp;

const SimpleToaster = (msg) => {
    SimpleToast.show(msg, SimpleToast.SHORT);
};

class FCMService {
    register = () => {
        this.checkPermission();
        this.createNotificationListeners();

        localNotificationService.configure();

        if (Platform.OS === "ios") {
            this.registerAppWithFCM();
        }
    };

    registerAppWithFCM = async () => {
        if (Platform.OS === "ios") {
            await messaging().registerDeviceForRemoteMessages();
            await messaging().setAutoInitEnabled(true);
        }
    };

    checkPermission = () => {
        messaging()
            .hasPermission()
            .then((enabled) => {
                if (enabled) {
                    this.getFcmToken();
                } else {
                    this.requestPermission();
                }
            })
            .catch((error) => { });
    };

    getFcmToken = () => {
        return new Promise((res) => {
            messaging()
                .getToken()
                .then((fcmToken) => {
                    if (fcmToken) {
                        print("[FCM TOKEN] => ", fcmToken);
                        res(fcmToken);
                    } else {
                        print("[FCMService] User Does not have a device token");
                    }
                })
                .catch((error) => {
                    // SimpleToaster('Please check your network connection.')
                    print("[FCMService] getToken rejected", error);
                });
        });
    };

    requestPermission = () => {
        messaging()
            .requestPermission()
            .then(() => {
                this.getFcmToken();
            })
            .catch((error) => {
                print("[FCMService] Request Permission rejected", error);
            });
    };

    deleteToken = () => {
        messaging()
            .deleteToken()
            .catch((error) => {
                print("[FCMService] Delete Token error", error);
            });
    };

    createNotificationListeners = () => {
        //when the application is running but in background
        messaging().onNotificationOpenedApp((remoteMessage) => {
            if (remoteMessage) {
                notificationOpen(remoteMessage);
            }
        });

        //when the application is opened from a quit state.
        messaging()
            .getInitialNotification()
            .then((remoteMessage) => {
                if (remoteMessage) {
                    notificationOpen(remoteMessage);
                }
            });

        //forgrounnd state messages
        this.messageListener = messaging().onMessage(async (remoteMessage) => {
            console.warn(remoteMessage);
            if (remoteMessage) {
                localNotificationService.showlocalNotification(remoteMessage);
            }
        });

        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
            if (remoteMessage) {
                // this.onNotification(remoteMessage,false);
            }
        });

        //Triggerd When have new token
        messaging().onTokenRefresh((fcmToken) => {
            print("[FCMService] new token refresh", fcmToken);
        });
    };

    unRegister = () => {
        if (this.messageListener) {
            this.messageListener();
        }
    };
}

export const fcmService = new FCMService();




// import { Platform } from 'react-native';

// class FCMService {

//     register = (onRegister, onNotification, onOpenNotification) => {

//         this.checkPermission(onRegister);

//         this.createNotificationListeners(

//             onRegister,

//             onNotification,

//             onOpenNotification,

//         );

//     };

//     registerAppWithFCM = async () => {

//         if (Platform.OS === 'ios') {

//             await messaging().registerDeviceForRemoteMessages();

//             await messaging().setAutoInitEnabled(true);

//         }

//     };

//     checkPermission = onRegister => {

//         messaging()

//             .hasPermission()

//             .then(enabled => {

//                 if (enabled) {

//                     // Use Has Permissions

//                     this.getToken(onRegister);

//                 } else {

//                     //user dont have permission

//                     this.requestPermission(onRegister);

//                 }

//             })

//             .catch(error => {

//                 console.log('[FCMService] permission rejected', error);

//             });

//     };

//     getToken = onRegister => {

//         messaging()

//             .getToken()

//             .then(fcmToken => {

//                 if (fcmToken) {

//                     onRegister(fcmToken);

//                 } else {

//                     console.log('[FCMService] User Does not have a device token');

//                 }

//             })

//             .catch(error => {

//                 console.log('[FCMService] getToken rejected', error);

//             });

//     };

//     requestPermission = onRegister => {

//         messaging()

//             .requestPermission()

//             .then(() => {

//                 this.getToken(onRegister);

//             })

//             .catch(error => {

//                 console.log('[FCMService] Request Permission rejected', error);
//                 // return Permissions.openSettings();  

//             });

//     };

//     deleteToken = () => {

//         console.log('[FCMService] deleteToken');

//         messaging()

//             .deleteToken()

//             .catch(error => {

//                 console.log('[FCMService] Delete Token error', error);

//             });

//     };

//     createNotificationListeners = (

//         onRegister,

//         onNotification,

//         onOpenNotification,

//     ) => {

//         //when the application is running but in background

//         messaging().onNotificationOpenedApp(remoteMessage => {

//             console.log(

//                 '[FCMService] onNotificationOpendApp Notification Cauesd app to open error',

//             );

//             if (remoteMessage) {

//                 const notification = remoteMessage.notification;

//                 onOpenNotification(notification, remoteMessage.data);

//                 //this.

//             }

//         });

//         //when the application is opened from a quit state.

//         messaging()

//             .getInitialNotification()

//             .then(remoteMessage => {
//                 console.log(

//                     '[FCMService] getInitialNotification Notification Cauesd app to open error',
//                     remoteMessage,

//                 );

//                 if (remoteMessage) {

//                     const notification = remoteMessage.notification;

//                     onOpenNotification(notification);

//                 }

//             });

//         //forgrounnd state messages

//         this.messageListener = messaging().onMessage(async remoteMessage => {

//             console.log('[FCMService] A new FCm message arrived', remoteMessage);

//             if (remoteMessage) {

//                 let notification = null;

//                 if (Platform.OS === 'ios') {

//                     notification = remoteMessage.data;

//                 } else {

//                     notification = remoteMessage.data;

//                 }

//                 var data = {

//                     channelId: 'channel-id',

//                     autoCancel: true,

//                     title: remoteMessage?.notification?.title || notification?.title,

//                     message: remoteMessage?.notification?.body || notification?.message,

//                     vibrate: true,

//                     vibration: 2000,

//                     playSound: true,

//                     allowWhileIdle: true,

//                     soundName: 'default',

//                     typeId: notification?.data?.typeId || notification?.data?.chatId,

//                     type: notification?.data?.type,

//                     requestPermissions: true,

//                     invokeApp: false,

//                 };

//                 onNotification(Platform.OS === 'ios' ? data : data);

//             }

//         });

//         //Triggerd When have new token

//         messaging().onTokenRefresh(fcmToken => {

//             console.log('[FCMService] new token refresh', fcmToken);

//         });

//     };

//     unRegister = () => {

//         this.messageListener();

//     };

// }

// export const fcmService = new FCMService();