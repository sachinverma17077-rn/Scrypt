import * as React from "react";
import { print } from "../Backend/print";

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef?.current?.navigate(name, params);
}

export const notificationOpen = (notification) => {
  print("/////------------------->", notification?.title);

  // setTimeout(() => {
  //   if (isReadyRef.current && navigationRef.current) {
  //     if (notification?.title) {
  //       navigate('Dashboard', {});
  //     } else {
  //       navigate('Notification', {});
  //     }
  //   } else {
  //     print("Navigator not ready");
  //   }
  // }, 3000);
 
};




// // notificationAction.js
// import * as React from "react";
// import { print } from "../Backend/print";

// export const navigationRef = React.createRef();
// export const isReadyRef = React.createRef();  

// export function navigate(name, params) {
//   if (isReadyRef.current && navigationRef.current) {
//     navigationRef.current.navigate(name, params);
//   } else {
//     print("Navigation not ready");
//   }
// }

// export const notificationOpen = (notification) => {
//   print("/////------------------->", notification?.title);

//   setTimeout(() => {
//     if (isReadyRef.current && navigationRef.current) {
//       if (notification?.title) {
//         navigate('Dashboard', {});
//       } else {
//         navigate('Notification', {});
//       }
//     } else {
//       print("Navigator not ready");
//     }
//   }, 3000);
// };



// import * as React from "react";
// import { print } from "../Backend/print";

// export const navigationRef = React.createRef();

// export function navigate(name, params) {
//   navigationRef?.current?.navigate(name, params);
// }

// export const notificationOpen = (notification) => {
//   print("/////------------------->", notification?.title);

//   setTimeout(() => {
//     if (isReadyRef.current && navigationRef.current) {
//       if (notification?.title) {
//         navigate('Dashboard', {});
//       } else {
//         navigate('Notification', {});
//       }
//     } else {
//       print("Navigator not ready");
//     }
//   }, 3000);
 
// };
