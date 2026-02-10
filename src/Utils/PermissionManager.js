import { Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Toast } from '../Backend/Backend';

class PermissionManager {
  // Get the appropriate camera permission based on platform
  static getCameraPermission() {
    return Platform.OS === 'ios' 
      ? PERMISSIONS.IOS.CAMERA 
      : PERMISSIONS.ANDROID.CAMERA;
  }

  // Get the appropriate photo library permission based on platform and Android version
  static getPhotoLibraryPermission() {
    if (Platform.OS === 'ios') {
      return PERMISSIONS.IOS.PHOTO_LIBRARY;
    } else {
      // For Android 13+ (API 33+), no permission needed - using Android Photo Picker
      // For older versions, use READ_EXTERNAL_STORAGE
      const androidVersion = Platform.constants?.Release || 0;
      return androidVersion >= 13 
        ? null // No permission needed for Android Photo Picker
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    }
  }

  // Get notification permission
  static getNotificationPermission() {
    return Platform.OS === 'ios' 
      ? PERMISSIONS.IOS.NOTIFICATIONS 
      : PERMISSIONS.ANDROID.POST_NOTIFICATIONS;
  }

  // Get location permission
  static getLocationPermission() {
    return Platform.OS === 'ios' 
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE 
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  }

  // Generic permission checker
  static async checkPermission(permission) {
    try {
      const result = await check(permission);
      return result;
    } catch (error) {
      console.error('Error checking permission:', error);
      return RESULTS.UNAVAILABLE;
    }
  }

  // Generic permission requester
  static async requestPermission(permission) {
    try {
      const result = await request(permission);
      return result;
    } catch (error) {
      console.error('Error requesting permission:', error);
      return RESULTS.UNAVAILABLE;
    }
  }

  // Handle camera permission with proper error messages
  static async handleCameraPermission() {
    const permission = this.getCameraPermission();
    const result = await this.checkPermission(permission);

    switch (result) {
      case RESULTS.GRANTED:
        return { granted: true, message: null };
      
      case RESULTS.DENIED:
        const requestResult = await this.requestPermission(permission);
        if (requestResult === RESULTS.GRANTED) {
          return { granted: true, message: null };
        } else {
          return { 
            granted: false, 
            message: 'Camera permission is required to take photos. Please enable it in settings.' 
          };
        }
      
      case RESULTS.LIMITED:
        return { granted: true, message: null };
      
      case RESULTS.BLOCKED:
        return { 
          granted: false, 
          message: 'Camera permission is blocked. Please enable it in device settings.' 
        };
      
      case RESULTS.UNAVAILABLE:
        return { 
          granted: false, 
          message: 'Camera is not available on this device.' 
        };
      
      default:
        return { 
          granted: false, 
          message: 'Unable to access camera. Please try again.' 
        };
    }
  }

  // Handle photo library permission with proper error messages
  static async handlePhotoLibraryPermission() {
    const permission = this.getPhotoLibraryPermission();
    
    // For Android 13+ (API 33+), no permission needed - Android Photo Picker handles it
    if (Platform.OS === 'android' && permission === null) {
      return { granted: true, message: null };
    }
    
    const result = await this.checkPermission(permission);

    switch (result) {
      case RESULTS.GRANTED:
        return { granted: true, message: null };
      
      case RESULTS.DENIED:
        const requestResult = await this.requestPermission(permission);
        if (requestResult === RESULTS.GRANTED) {
          return { granted: true, message: null };
        } else {
          return { 
            granted: false, 
            message: 'Photo library permission is required to select images. Please enable it in settings.' 
          };
        }
      
      case RESULTS.LIMITED:
        return { granted: true, message: null };
      
      case RESULTS.BLOCKED:
        return { 
          granted: false, 
          message: 'Photo library permission is blocked. Please enable it in device settings.' 
        };
      
      case RESULTS.UNAVAILABLE:
        return { 
          granted: false, 
          message: 'Photo library is not available on this device.' 
        };
      
      default:
        return { 
          granted: false, 
          message: 'Unable to access photo library. Please try again.' 
        };
    }
  }

  // Handle notification permission
  static async handleNotificationPermission() {
    const permission = this.getNotificationPermission();
    const result = await this.checkPermission(permission);

    switch (result) {
      case RESULTS.GRANTED:
        return { granted: true, message: null };
      
      case RESULTS.DENIED:
        const requestResult = await this.requestPermission(permission);
        if (requestResult === RESULTS.GRANTED) {
          return { granted: true, message: null };
        } else {
          return { 
            granted: false, 
            message: 'Notification permission is required to receive updates. Please enable it in settings.' 
          };
        }
      
      case RESULTS.LIMITED:
        return { granted: true, message: null };
      
      case RESULTS.BLOCKED:
        return { 
          granted: false, 
          message: 'Notification permission is blocked. Please enable it in device settings.' 
        };
      
      case RESULTS.UNAVAILABLE:
        return { 
          granted: false, 
          message: 'Notifications are not available on this device.' 
        };
      
      default:
        return { 
          granted: false, 
          message: 'Unable to access notifications. Please try again.' 
        };
    }
  }

  // Handle location permission
  static async handleLocationPermission() {
    const permission = this.getLocationPermission();
    const result = await this.checkPermission(permission);

    switch (result) {
      case RESULTS.GRANTED:
        return { granted: true, message: null };
      
      case RESULTS.DENIED:
        const requestResult = await this.requestPermission(permission);
        if (requestResult === RESULTS.GRANTED) {
          return { granted: true, message: null };
        } else {
          return { 
            granted: false, 
            message: 'Location permission is required for this feature. Please enable it in settings.' 
          };
        }
      
      case RESULTS.LIMITED:
        return { granted: true, message: null };
      
      case RESULTS.BLOCKED:
        return { 
          granted: false, 
          message: 'Location permission is blocked. Please enable it in device settings.' 
        };
      
      case RESULTS.UNAVAILABLE:
        return { 
          granted: false, 
          message: 'Location services are not available on this device.' 
        };
      
      default:
        return { 
          granted: false, 
          message: 'Unable to access location. Please try again.' 
        };
    }
  }

  // Show error message if permission is not granted
  static showPermissionError(message) {
    if (message) {
      Toast(message);
    }
  }
}

export default PermissionManager;
