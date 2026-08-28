import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  KeyboardEvent,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface KeyboardAvoidingProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  keyboardVerticalOffset?: number;
}

const KeyboardWrapper = ({
  children,
  style,
  keyboardVerticalOffset: propOffset,
}: KeyboardAvoidingProps) => {
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  useEffect(() => {
    const onKeyboardShow = (e: KeyboardEvent) => {
      setKeyboardHeight(e.endCoordinates?.height || 0);
    };

    const onKeyboardHide = () => {
      setKeyboardHeight(0);
    };

    const showListener = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardShow,
    );

    const hideListener = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardHide,
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  const behavior =
    Platform.OS === 'ios'
      ? 'padding'
      : keyboardHeight > 0
      ? 'height'
      : undefined;

  const keyboardVerticalOffset = useMemo<number>(() => {
    if (typeof propOffset === 'number') {
      return propOffset;
    }

    if (Platform.OS === 'ios') {
      return 60;
    }

    return 0;
  }, [propOffset]);

  return (
    <KeyboardAvoidingView
      style={[styles.container, style]}
      behavior={behavior}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
       <KeyboardAwareScrollView
    enableOnAndroid
    extraScrollHeight={50}
    keyboardShouldPersistTaps="handled"
    showsVerticalScrollIndicator={false}
    contentContainerStyle={styles.scrollContainer}
  >
        <View style={styles.inner}>{children}</View>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  inner: {
    flex: 1,
  },
});