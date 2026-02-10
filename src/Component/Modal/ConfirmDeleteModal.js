import React from 'react';
import {
  Modal,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Typography from '../UI/Typography';
import { Fonts } from '../../Constants/Font';
import icons from '../../Constants/icons';

const ConfirmDeleteModal = ({
  visible,
  onConfirm,
  onCancel,
  source=icons.trash,
  title = 'Delete Appliance',
  message = 'Are you sure you want to delete this appliance permanently?',
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
                    <StatusBar
        backgroundColor="rgba(0,0,0,0.4)"
        barStyle="light-content"
        translucent
      />

      <View style={styles.overlay}>
        <View style={styles.container}>
   
          <View style={styles.iconWrapper}>
            <Image source={source} style={styles.icon} />
          </View>
 <TouchableOpacity onPress={onCancel} style={{top:10, right:8, position:'absolute'}}>

 
            <Image source={icons.add} style={[ {tintColor:'black',  height:22,width:22, resizeMode:'contain'}]} />

 </TouchableOpacity>
          <Typography
            size={18}
            fontFamily={Fonts.Manrope_Bold}
            color="#1A202C"
            textAlign="center"
            style={{ marginTop: 18 }}
          >
            {title}
          </Typography>

          <Typography
            size={14}
            fontFamily={Fonts.Manrope_Regular}
            color="#4A5568"
            textAlign="center"
            style={{ marginTop: 8, marginBottom: 24 }}
          >
            {message}
          </Typography>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onCancel}
              style={[styles.button, styles.cancelButton]}
            >
              <Typography
                color="#1A202C"
                fontFamily={Fonts.Manrope_SemiBold}
              >
                Cancel
              </Typography>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onConfirm}
              style={[styles.button, styles.deleteButton]}
            >
              <Typography
                color="#FFFFFF"
                fontFamily={Fonts.Manrope_SemiBold}
              >
                Delete
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmDeleteModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    alignItems: 'center',
  },
  iconWrapper: {
    height: 68,
    width: 68,
    backgroundColor: '#EE1D52',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 32,
    width: 32,
    tintColor: '#FFFFFF',
    resizeMode: 'contain',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    borderRadius: 60,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#E2E8F0',
    marginRight: 6,
    borderWidth:1,
    borderColor:'#1A202C'
  },
  deleteButton: {
    backgroundColor: '#EE1D52',
    marginLeft: 6,
  },
});
