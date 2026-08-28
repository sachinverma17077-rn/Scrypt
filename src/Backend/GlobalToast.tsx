import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  View,
} from 'react-native';
import Typography from '../Component/UI/Typography';

export type ToastType = 'success' | 'error' | 'info';

interface ToastState {
  visible: boolean;
  message: string;
  type: ToastType;
}

declare global {
  var ToastMessage:
    | ((message: string, type?: ToastType) => void)
    | undefined;
}

const GlobalToast: React.FC = () => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;
const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: '',
    type: 'success',
  });

  useEffect(() => {
    globalThis.ToastMessage = (
      message: string,
      type: ToastType = 'success',
    ) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      setToast({
        visible: true,
        message,
        type,
      });

      translateY.setValue(-100);
      opacity.setValue(0);

      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      timer.current = setTimeout(() => {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -100,
            duration: 300,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setToast({
            visible: false,
            message: '',
            type: 'success',
          });
        });
      }, 3000);
    };

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      globalThis.ToastMessage = undefined;
    };
  }, []);

  if (!toast.visible) {
    return null;
  }

  const backgroundColor =
    toast.type === 'success'
      ? '#22C55E'
      : toast.type === 'error'
      ? '#EF4444'
      : '#3B82F6';

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor,
          opacity,
          transform: [{ translateY }],
        },
      ]}>
      <Typography color="white" size={14}>
        {toast.message}
      </Typography>
    </Animated.View>
  );
};

export default GlobalToast;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    width: '90%',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    zIndex: 9999,
  },
});