import { StyleSheet, Modal, View, TouchableOpacity, Image, Platform } from 'react-native';
import React from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import DocumentPicker from 'react-native-document-picker';
import PermissionManager from '../../Utils/PermissionManager';
import SimpleToast from 'react-native-simple-toast';
import { windowHeight } from '../../Constants/Dimensions';
// import localization from '../../Constants/localization';
import Typography from '../UI/Typography';
import { Fonts } from '../../Constants/Font';
import { Colors } from '../../Constants/colors';
import { Images } from '../../Constants/Images';
import localization from '../../Constants/localization';

const ImageModal = ({
  showModal,
  documents = false,
  document,
  close = () => { },
  selected = () => { },
  TimeVal,
  deleteImage = false,
}) => {
  const handlePermission = async (permissionHandler, action) => {
    try {
      const result = await permissionHandler();
      if (result.granted) {
        action();
      } else {
        PermissionManager.showPermissionError(result.message);
      }
    } catch (error) {
      SimpleToast.show('Permission error occurred. Please try again.');
    }
  };

  const OpenCamera = async () => {
    await handlePermission(PermissionManager.handleCameraPermission, () => {
      launchCamera(
        {
          mediaType: 'photo',
          maxWidth: 500,
          maxHeight: 500,
          quality: 0.7,
        },
        response => {
          if (!response.didCancel) {
            selected(response.assets, 'camera');
            close();
          }
        },
      );
    });
  };

  const OpenGallery = async () => {
    await handlePermission(PermissionManager.handlePhotoLibraryPermission, () => {
      launchImageLibrary(
        {
          mediaType: 'photo',
          maxWidth: 500,
          maxHeight: 500,
          quality: 0.7,
          // Use Android Photo Picker (no permission needed on Android 13+)
          ...(Platform.OS === 'android' && {
            presentationStyle: 'pageSheet',
            useAndroidPhotoPicker: true,
          }),
        },
        response => {
          if (!response.didCancel) {
            selected(response.assets, 'gallery');
            close();
          }
        },
      );
    });
  };
  return (
    <Modal
      statusBarTranslucent
      onRequestClose={() => close()}
      transparent={true}
      visible={showModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => close()}>
              <Image source={Images.close} style={{ height: 20, width: 20 }} />
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.modalView,
              { height: documents || deleteImage ? 220 : 200 },
            ]}
          >
            <TouchableOpacity style={styles.checkView} onPress={OpenCamera}>
              <View style={styles.iconContainer}>
                <Image
                  style={styles.icon}
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/685/685655.png',
                  }}
                />
              </View>
              <Typography
                size={16}
                style={{ marginTop: 5 }}
                fontFamily={Fonts.Outfit_Medium}
              >
                {localization?.ImageModal?.camera}
              </Typography>
            </TouchableOpacity>

            <TouchableOpacity style={styles.checkView} onPress={OpenGallery}>
              <View style={styles.iconContainer}>
                <Image
                  style={styles.icon}
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/16025/16025439.png',
                  }}
                />
              </View>
              <Typography
                size={16}
                fontFamily={Fonts.Outfit_Medium}
                style={{ marginTop: 5 }}
              >
                {localization?.ImageModal?.gallery}
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ImageModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.Black + '80',


  },
  modalContent: {
    backgroundColor: Colors.White,
    marginHorizontal: 20,
    borderRadius: 20,
    height: windowHeight / 4,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  modalHeader: {
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  checkView: {
    alignItems: 'center',
  },
  modalView: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: "space-around"
  },
  iconContainer: {
    borderRadius: 50,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5
  },
  icon: {
    height: 25,
    width: 25,
  },
});
