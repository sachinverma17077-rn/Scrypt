import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

export type Icons =
  | 'right_arrow'
  | 'chat_Tab'
  | 'active_Chat_Tab'
  | 'call_Tab'
  | 'call_Tab_Active'
  | 'profile_Tab'
  | 'profile_Tab_Active';

type Props = {
  size?: number;
  name?: Icons;
  color?: string;
};

const SvgIcon: React.FC<Props> = ({
  name,
  size = 24,
  color = '#4A90E2',
}) => {
  switch (name) {
    case 'right_arrow':
      return (
        <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
          <Path
            d="M20 8.77193V11.2281H4.80938L11.7889 18.2456L10.0293 20L0 10L10.0293 0L11.7889 1.75439L4.80938 8.77193H20Z"
            fill={color}
          />
        </Svg>
      );

    case 'chat_Tab':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path fill="none" d="M0 0h24v24H0z" />
          <Path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 19.5V4c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1H5.5Z"
          />
        </Svg>
      );

    case 'active_Chat_Tab':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path fill="none" d="M0 0h24v24H0z" />
          <G
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          >
            <Path d="M3 19.5V4c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1H5.5Z" />
            <Path d="M8 7h8" />
            <Path d="M8 10h8" />
            <Path d="M8 13h4" />
          </G>
        </Svg>
      );

    case 'call_Tab':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path fill="none" d="M0 0h24v24H0z" />
          <Path
            d="M8 3c.5 0 2.5 4.5 2.5 5 0 1-1.5 2-2 3s.5 2 1.5 3c.39.39 2 2 3 1.5s2-2 3-2c.5 0 5 2 5 2.5 0 2-1.5 3.5-3 4s-2.5.5-4.5 0-3.5-1-6-3.5-3-4-3.5-6-.5-3 0-4.5 2-3 4-3Z"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );

    case 'call_Tab_Active':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M0 0h24v24H0z" fill="none" />
          <G stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
            <Path 
              fill={color} 
              d="M8 3c0.5 0 2.5 4.5 2.5 5 0 1 -1.5 2 -2 3c-0.5 1 0.5 2 1.5 3c0.39 0.39 2 2 3 1.5c1 -0.5 2 -2 3 -2c0.5 0 5 2 5 2.5c0 2 -1.5 3.5 -3 4c-1.5 0.5 -2.5 0.5 -4.5 0c-2 -0.5 -3.5 -1 -6 -3.5c-2.5 -2.5 -3 -4 -3.5 -6c-0.5 -2 -0.5 -3 0 -4.5c0.5 -1.5 2 -3 4 -3Z" 
            />
            <Path d="M15.76 8.28c-0.5 -0.51 -1.1 -0.93 -1.76 -1.24M15.76 8.28c0.49 0.49 0.9 1.08 1.2 1.72" />
            <Path d="M18.67 5.35c-1 -1 -2.26 -1.73 -3.67 -2.1M18.67 5.35c0.99 1 1.72 2.25 2.08 3.65" />
          </G>
        </Svg>
      );

    case 'profile_Tab':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path fill="none" d="M0 0h24v24H0z" />
          <G
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          >
            <Path d="M12 5c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3Z" />
            <Path d="M12 14c4 0 7 2 7 3v2H5v-2c0-1 3-3 7-3Z" />
          </G>
        </Svg>
      );

    case 'profile_Tab_Active':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path fill="none" d="M0 0h24v24H0z" />
          <G
            fill={color}
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          >
            <Path d="M12 5c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3Z" />
            <Path d="M12 14c4 0 7 2 7 3v2H5v-2c0-1 3-3 7-3Z" />
          </G>
        </Svg>
      );

    default:
      return null;
  }
};

export default SvgIcon;