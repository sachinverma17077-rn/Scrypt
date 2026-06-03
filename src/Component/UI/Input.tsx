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
    placeholder?:string;
    iconName?:string;
    
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
  placeholder = '#64748B' ,
  iconName
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

      <View
        style={[
          styles.InputView,
          styleInputView,
         
        ]}
        >
         <View style={[styles?.firstIcon]}>
           <SvgIcon name={iconName} color='#64748B' />
         </View>
        <TextInput
          value={value}
          onChangeText={onChange}
         style={[styles.input, {color: textColor}]}
          cursorColor={cursorColor}
          placeholderTextColor={placeholderTextColor}
          onFocus={onFocus}
          // onBlur={() => setIsFocused(false)}
          keyboardType={keyboardType}
          placeholder={placeholder}
          
          
        />
      </View>

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
marginBottom:15
  },

  title: {
    marginBottom: 8,
  },

  InputView: {
    borderWidth:1,
    borderColor:Colors?.inputBorderColor,
    borderRadius:12,
    height:55,
    // justifyContent:'space-between',
    flexDirection:"row",
    alignItems:'center'

  },

  input: {
    paddingHorizontal: 16,
    color: '#fff',
    fontSize:18
    // paddingVertical:20
  },

  errorText: {
    marginTop: 4,
    textAlign: 'right',
  },
  firstIcon:{
paddingLeft:10
  },
});