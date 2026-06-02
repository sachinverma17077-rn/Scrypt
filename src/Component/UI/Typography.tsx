import React, {ReactNode} from 'react';
import {
  StyleSheet,
  Text as RNText,
  TextProps,
  TextStyle,
  StyleProp,
} from 'react-native';



interface TypographyProps extends TextProps {
  size?: number;
  children?: ReactNode;
  fontFamily?: string;
  color?: string;
  textAlign?: TextStyle['textAlign'];
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  lineHeight?: number;
  fontWeight?: TextStyle['fontWeight'];
  letterSpacing?: number;
  onPress?: () => void;
}

const Typography = ({
  size = 14,
  children,
  fontFamily,
  color = 'black',
  textAlign = 'left',
  style,
  numberOfLines,
  lineHeight,
  fontWeight,
  letterSpacing,
  onPress,
  ...props
}: TypographyProps) => {
  return (
    <RNText
      onPress={onPress}
      numberOfLines={numberOfLines}
      style={[
        styles.font,
        {
          fontSize: size,
          color,
          textAlign,
          fontWeight,
          lineHeight,
          fontFamily,
          letterSpacing,
        },
        style,
      ]}
      {...props}>
      {children}
    </RNText>
  );
};

export default Typography;

const styles = StyleSheet.create({
  font: {
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});