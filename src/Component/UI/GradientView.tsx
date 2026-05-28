import React, { ReactNode } from 'react'
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

interface AppGradientProps {
  children?: ReactNode
  colors: string[]
  style?: StyleProp<ViewStyle>
}

const AppGradient = ({
  children,
  colors,
  style,
}: AppGradientProps) => {
  return (
    <LinearGradient
      colors={colors}
      style={[styles.container, style]}
    >
      {children}
    </LinearGradient>
  )
}

export default AppGradient

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
  },
})