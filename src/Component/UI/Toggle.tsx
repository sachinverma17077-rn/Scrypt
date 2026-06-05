import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../Constants/colors';

interface ToggleProps {
  value?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Toggle = ({ value = false, style }: ToggleProps) => {
  const [isActive, setIsActive] = useState<boolean>(value);

  return (
    <TouchableOpacity
    activeOpacity={0.5}
      onPress={() => setIsActive(!isActive)}
      style={[
        styles.main,
        style,
        {
          alignItems: isActive ? 'flex-start' : 'flex-end',
            backgroundColor: isActive ?  '#E2E8F0':'#5098e4',
        },
      ]}>
      <View style={styles.toggleButton} />
    </TouchableOpacity>
  );
};

export default Toggle;

const styles = StyleSheet.create({
  main: {
    width: 44,
    height: 24,
    borderRadius: 100,
  
    elevation: 2,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleButton: {
    height: 20,
    width: 20,
    borderRadius: 50,
    backgroundColor: Colors.white,
  },
});