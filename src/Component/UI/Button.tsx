import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Typography from './Typography';
import Font from '../../Constants/Font';
import SvgIcon from '../../Constants/SvgIcon';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  icon?: boolean;
  loading?: boolean;
}

const Button = ({
  title,
  onPress,
  style,
  disabled = false,
  icon = false,
  loading = false,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      disabled={disabled || loading}
    >
      <LinearGradient
        style={[styles.gradient, style]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#005DA7', '#2976C7']}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <>
            <Typography
              color="#FFFFFF"
              size={18}
              fontFamily={Font?.Bold}
            >
              {title}
            </Typography>

            {icon && (
              <SvgIcon
                name="arrow_right"
                color="white"
              />
            )}
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  gradient: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    gap: 10,
  },
});