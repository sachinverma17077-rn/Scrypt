import {
  StyleSheet,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import React from 'react';
import { Colors } from '../../Constants/colors';

const CustomModal = ({
  visible = false,
  onRequestClose = () => { },
  children,
  backgroundColor = Colors.White,
  style,
  testID,
}) => {
  return (
    <Modal
      testID={testID}
      transparent
      statusBarTranslucent={true}
      animationType="fade"
      visible={visible}
      
      onRequestClose={onRequestClose}
      >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.6)',
        }}
        behavior="padding">
        <View
          // onPress={close}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
          <View
            style={[
              styles.animateView,
              { backgroundColor: backgroundColor },
              { ...style },
            ]}>
            <View >{children}</View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  animateView: {
    width: '90%',
    padding: 20,
    borderRadius: 16,
  },
});