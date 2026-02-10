# Permission Management System

This document explains the centralized permission management system implemented in the Kapitán Player app.

## Overview

The app now uses a centralized `PermissionManager` utility to handle all permissions consistently across Android and iOS platforms. This helps avoid Google Play Store permission issues and provides better user experience.

## Files Updated

### 1. PermissionManager.js
- Centralized permission handling utility
- Platform-specific permission logic
- User-friendly error messages
- Consistent API across all components

### 2. Android Manifest (AndroidManifest.xml)
- Removed problematic `READ_MEDIA_VIDEO` permission
- Added proper permission descriptions
- Used `maxSdkVersion` for legacy permissions
- Organized permissions with clear comments

### 3. iOS Info.plist
- Updated permission descriptions to be more user-friendly
- Added location permission description
- Improved notification permission description

### 4. Updated Components
- `ImageSelection.js` - Uses centralized permission management
- `ImageSelectionDoc.js` - Uses centralized permission management  
- `ImageModal.js` - Uses centralized permission management
- `App.js` - Uses centralized notification permission handling

## Key Features

### 1. Platform Detection
- Automatically detects Android version for appropriate permissions
- Uses `READ_MEDIA_IMAGES` for Android 13+ (API 33+)
- Falls back to `READ_EXTERNAL_STORAGE` for older versions

### 2. Permission Types Handled
- **Camera**: For taking photos
- **Photo Library**: For selecting images from gallery
- **Notifications**: For push notifications
- **Location**: For sports activities (if needed)

### 3. Error Handling
- User-friendly error messages
- Proper handling of denied, blocked, and unavailable permissions
- Graceful fallbacks when permissions are not available

### 4. Google Play Store Compliance
- Removed problematic `READ_MEDIA_VIDEO` permission
- Uses only necessary permissions
- Proper permission descriptions for app store review

## Usage Example

```javascript
import PermissionManager from '../Utils/PermissionManager';

// Check camera permission
const result = await PermissionManager.handleCameraPermission();
if (result.granted) {
  // Proceed with camera functionality
} else {
  PermissionManager.showPermissionError(result.message);
}

// Check photo library permission
const photoResult = await PermissionManager.handlePhotoLibraryPermission();
if (photoResult.granted) {
  // Proceed with photo selection
} else {
  PermissionManager.showPermissionError(photoResult.message);
}
```

## Benefits

1. **Google Play Store Compliance**: No more permission-related rejections
2. **Better User Experience**: Clear, user-friendly permission messages
3. **Maintainable Code**: Centralized permission logic
4. **Platform Consistency**: Same API for both Android and iOS
5. **Future-Proof**: Easy to add new permissions or modify existing ones

## Migration Notes

- All image selection components now use `react-native-image-picker` instead of `react-native-image-crop-picker`
- Permission handling is now async/await based
- Error messages are more descriptive and user-friendly
- No more manual permission checking in individual components
