import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  TextStyle,
  TextInput,
  KeyboardTypeOptions,
  TouchableOpacity,
} from 'react-native';

import Typography from './Typography';
import Font from '../../Constants/Font';
import { Colors } from '../../Constants/colors';
import SvgIcon from '../../Constants/SvgIcon';

interface InputProps {
  style?: StyleProp<ViewStyle>;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  value?: string;
  onChange?: (text: string) => void;
  styleInputView?: StyleProp<ViewStyle>;
  cursorColor?: string;
  placeholderTextColor?: string;
  onFocus?: () => void;
  keyboardType?: KeyboardTypeOptions;
  error?: string;
  textColor?: string;
  placeholder?: string;
  iconName?: string;
  secure?: boolean;
  forgot?: boolean;
  onForgotPress?:any
}

const Input = ({
  style,
  title = '',
  titleStyle,
  value,
  onChange,
  styleInputView,
  cursorColor = '#000',
  placeholderTextColor = '#64748B',
  onFocus,
  keyboardType = 'default',
  error,
  textColor = '#000',
  placeholder = '',
  iconName,
  secure = false,
  forgot = false,
  onForgotPress
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.mainInput, style]}>
     <View style={{justifyContent:"space-between" ,flexDirection:"row"}}>
       {!!title && (
        <Typography
          fontFamily={Font.Regular}
          size={13}
          color={Colors.title}
          style={[styles.title, titleStyle]}
        >
          {title}
        </Typography>
      )}

          {forgot && (
        <TouchableOpacity onPress={onForgotPress}>
          <Typography
          fontFamily={Font?.SemiBold}
          size={13}
          color={'#005DA7'}
          style={[styles.title, titleStyle]}
        >
         Forgot?
        </Typography>
        </TouchableOpacity>
      )}
     </View>

      <View style={[styles.InputView, styleInputView]}>
        {!!iconName && (
          <View style={styles.firstIcon}>
            <SvgIcon name={iconName} color="#64748B" />
          </View>
        )}

        <TextInput
          value={value}
          onChangeText={onChange}
          style={[styles.input, { color: textColor }]}
          cursorColor={cursorColor}
          placeholderTextColor={placeholderTextColor}
          onFocus={onFocus}
          keyboardType={keyboardType}
          placeholder={placeholder}
          secureTextEntry={secure && !showPassword}
        />

        {secure && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowPassword(prev => !prev)}
            style={styles.eyeButton}
          >
            <SvgIcon
              name={showPassword ? 'eye' : 'eye_off'}
              color="#64748B"
            />
          </TouchableOpacity>
        )}
      </View>

      {!!error && (
        <Typography
          size={12}
          color={Colors.errorText}
          fontFamily={Font?.Regular}
          style={styles.errorText}
        >
          {error}
        </Typography>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  mainInput: {
    marginBottom: 15,
  },

  title: {
    marginBottom: 8,
  },

  InputView: {
    borderWidth: 1,
    borderColor: Colors.inputBorderColor,
    borderRadius: 12,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(173, 193, 237, 0.1)',
  },

  firstIcon: {
    paddingLeft: 12,
  },

  input: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    height: '100%',
  },

  eyeButton: {
    paddingHorizontal: 15,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorText: {
    marginTop: 4,
    textAlign: 'right',
  },
});