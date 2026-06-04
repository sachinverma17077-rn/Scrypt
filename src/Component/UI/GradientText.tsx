import React from 'react';
import { Text, StyleSheet, TextStyle, StyleProp } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

interface GradientTextProps {
  text: string;
  style?: StyleProp<TextStyle>;
  colors?: string[];
  start?: {
    x: number;
    y: number;
  };
  end?: {
    x: number;
    y: number;
  };
}

const GradientText: React.FC<GradientTextProps> = ({
  text,
  style,
  colors = ['#ff6a00', '#ee0979'],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
}) => {
  return (
    <MaskedView
      maskElement={
        <Text style={[styles.text, style]}>
          {text}
        </Text>
      }
    >
      <LinearGradient
        colors={colors}
        start={start}
        end={end}
      >
        <Text
          style={[
            styles.text,
            style,
            { opacity: 0 },
          ]}
        >
          {text}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});