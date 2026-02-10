import {StyleSheet, View} from 'react-native';
import React from 'react';
import { Colors } from '../../../Constants/colors';

const ViewContainer = ({
  children,
  backgroundColor = Colors.primary,
  style = {},
}) => {
  return (
    <View
      style={[
        {backgroundColor: Colors.primary},
        containerStyle.container(backgroundColor),
        style,
      ]}>
      {children}
    </View>
  );
};

export default ViewContainer;

export const containerStyle = StyleSheet.create({
  container: backgroundColor => {
    return {flex: 1, backgroundColor};
  },
});
