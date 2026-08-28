import React from 'react';
import { StyleSheet, View } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';

interface OTPInputProps {
  value?: string;
  numberOfDigits?: number;
  autoFocus?: boolean;
  disabled?: boolean;
  secureTextEntry?: boolean;
  focusColor?: string;
  placeholder?: string;
  onTextChange?: (text: string) => void;
  onFilled?: (text: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({
  value,
  numberOfDigits = 6,
  autoFocus = true,
  disabled = false,
  secureTextEntry = false,
  focusColor = '#005DA7',
  placeholder = '******',
  onTextChange,
  onFilled,
}) => {
  return (
    <View style={styles.container}>
      <OtpInput
        numberOfDigits={numberOfDigits}
        autoFocus={autoFocus}
        disabled={disabled}
        secureTextEntry={secureTextEntry}
        focusColor={focusColor}
        placeholder={placeholder}
        blurOnFilled
        type="numeric"
        hideStick={false}
        onTextChange={onTextChange}
        onFilled={onFilled}
        textInputProps={{
          keyboardType: 'number-pad',
        }}
        theme={{
          containerStyle: styles.otpContainer,
          pinCodeContainerStyle: styles.pinCodeContainer,
          focusedPinCodeContainerStyle: styles.focusedPinCodeContainer,
          filledPinCodeContainerStyle: styles.filledPinCodeContainer,
          pinCodeTextStyle: styles.pinCodeText,
          placeholderTextStyle: styles.placeholderText,
          focusStickStyle: styles.focusStick,
        }}
      />
    </View>
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  otpContainer: {
    width: '100%',
    justifyContent: 'space-between',
  },

  pinCodeContainer: {
    width: 45,
    height: 60,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },

  focusedPinCodeContainer: {
    borderColor: '#005DA7',
    borderWidth: 2,
  },

  filledPinCodeContainer: {
    borderColor: '#005DA7',
  },

  pinCodeText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111827',
  },

  placeholderText: {
    color: '#94A3B8',
  },

  focusStick: {
    backgroundColor: '#005DA7',
    width: 2,
  },
});