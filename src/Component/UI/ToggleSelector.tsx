import React, { useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { FULL_WIDTH } from '../../Constants/Dimensions';
import Typography from './Typography';

interface ToggleSelectorProps {
  mainViewStyle?: StyleProp<ViewStyle>;
  firstText?: string;
  secondText?: string;
  onChange?: (index: number) => void;
}

const CONTAINER_WIDTH = FULL_WIDTH * 0.89;
const SLIDER_WIDTH = (CONTAINER_WIDTH - 12) / 2; // 4px padding on each side + 4px gap

const ToggleSelector = ({
  mainViewStyle,
  firstText = 'First',
  secondText = 'Second',
  onChange,
}: ToggleSelectorProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const translateX = useSharedValue(0);

  const sliderStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(translateX.value, {
          duration: 350,
        }),
      },
    ],
  }));

  const handlePress = (index: number) => {
    setActiveTab(index);

    translateX.value = index === 0 ? 0 : SLIDER_WIDTH;

    onChange?.(index);
  };

  return (
    <View style={[styles.mainView, mainViewStyle]}>
      <Animated.View style={[styles.slider, sliderStyle]} />

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={() => handlePress(0)}>
        <Typography
          color={activeTab === 0 ? '#FFFFFF' : '#005DA7'}
          size={16}
          fontFamily={activeTab === 0 ? 'SemiBold' : 'Bold'}>
          {firstText}
        </Typography>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={() => handlePress(1)}>
        <Typography
          color={activeTab === 1 ? '#FFFFFF' : '#005DA7'}
          size={16}
          fontFamily={activeTab === 1 ? 'SemiBold' : 'Bold'}>
          {secondText}
        </Typography>
      </TouchableOpacity>
    </View>
  );
};

export default ToggleSelector;

const styles = StyleSheet.create({
  mainView: {
    width: CONTAINER_WIDTH,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginBottom: 12,
    position: 'relative',
    overflow: 'hidden',
  },

  slider: {
    position: 'absolute',
    left:6,
    top: 4,
    width: SLIDER_WIDTH,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#005DA7',
  },

  button: {
    flex: 1,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});