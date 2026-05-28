import {
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  TextStyle,
  TextInput,
} from 'react-native'
import React from 'react'

import Typography from './Typography'
import Font from '../../Constants/Font'
import { Colors } from '../../Constants/colors'
import AppGradient from './GradientView'
import { GradientColors } from '../../Constants/GradientColor'

interface InputProps {
  style?: StyleProp<ViewStyle>
  title?: string
  titleStyle?: StyleProp<TextStyle>
  value?: string
  onChange?: (text: string) => void
  styleInputView ?:StyleProp<ViewStyle>
  cursorColor?: StyleProp<TextStyle>
  placeholderTextColor?: StyleProp<TextStyle>
}

const Input = ({
  style,
  title = '',
  titleStyle,
  value,
  onChange,
  styleInputView,
  cursorColor,
  placeholderTextColor
}: InputProps) => {
  return (
    <View style={[styles.mainInput, style]}>
      <Typography
        fontFamily={Font?.Regular}
        size={18}
        color={Colors?.title}
        style={[styles.title, titleStyle]}
      >
        {title}
      </Typography>

      <AppGradient style={[styles?.InputView,styleInputView]} colors={GradientColors.Input}>
        <TextInput
          value={value}
          onChangeText={onChange}
          style={styles.input}
          cursorColor={cursorColor}
         placeholderTextColor={placeholderTextColor}
        />
      </AppGradient>
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  mainInput: {
    padding: 16,
  },

  title: {
    marginBottom: 8,
  },

  input: {
    padding: 14,
    color: '#fff',
  },
  InputView:{
    
  }
})