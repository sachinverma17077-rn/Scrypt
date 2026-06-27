import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../Constants/colors';

interface MainContainerProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const MainContainer: React.FC<MainContainerProps> = ({
  children,
  style,
}) => {
  const inset = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: Colors.white,
          paddingBottom: inset.bottom,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default MainContainer;

const styles = StyleSheet.create({});