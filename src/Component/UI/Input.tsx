import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  TextStyle,
  TextInput,
  KeyboardTypeOptions,
} from 'react-native';

import Typography from './Typography';
import Font from '../../Constants/Font';
import {Colors} from '../../Constants/colors';
import AppGradient from './GradientView';
import {GradientColors} from '../../Constants/GradientColor';

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
    
}

const Input = ({
  style,
  title = '',
  titleStyle,
  value,
  onChange,
  styleInputView,
  cursorColor,
  placeholderTextColor,
  onFocus,
  keyboardType = 'default',
  error,
  textColor = '#000000ff', 
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  return (
    <View style={[styles.mainInput, style]}>
      {!!title && (
        <Typography
          fontFamily={Font?.Regular}
          size={16}
          color={Colors?.title}
          style={[styles.title, titleStyle]}>
          {title}
        </Typography>
      )}

      <AppGradient
        style={[
          styles.InputView,
          styleInputView,
          {
            height: isFocused ? 40 : 30,
            borderWidth: 0.5,
            borderRadius: 12,
            borderColor: isFocused
              ? Colors?.BorderColorDark
              : Colors?.BorderColorLight,
          },
        ]}
        colors={GradientColors.Input}>
        <TextInput
          value={value}
          onChangeText={onChange}
         style={[styles.input, {color: textColor}]}
          cursorColor={cursorColor}
          placeholderTextColor={placeholderTextColor}
          onFocus={handleFocus}
          onBlur={() => setIsFocused(false)}
          keyboardType={keyboardType}
          
        />
      </AppGradient>

      {!!error && (
        <Typography
          size={14}
          color={Colors?.errorText}
          style={styles.errorText}>
          {error}
        </Typography>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  mainInput: {
    padding: 16,
  },

  title: {
    marginBottom: 8,
  },

  InputView: {},

  input: {
    paddingHorizontal: 14,
    color: '#fff',
    // paddingVertical:20
  },

  errorText: {
    marginTop: 4,
    textAlign: 'right',
  },
});