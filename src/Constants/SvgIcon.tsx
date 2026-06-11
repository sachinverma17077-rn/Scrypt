import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

export type Icons =
  | 'right_arrow'
  | 'chat_Tab'
  | 'active_Chat_Tab'
  | 'call_Tab'
  | 'call_Tab_Active'
  | 'profile_Tab'
  | 'profile_Tab_Active'
  | 'lock'
  | 'mail'
  | 'key'
  | 'eye'
  | 'device'
  | 'eye_off'
  | 'check'
  | 'arrow_right'
  | 'google'
  | 'apple'
  | 'facebook'
  | 'shield'
  | 'shield_check'
  | 'shield_lock'
  | 'arrow_left'
  | 'mail_check'
  | 'device_check'

type Props = {
  size?: number;
  name?: any;
  color?: string;
};

const SvgIcon: React.FC<Props> = ({
  name,
  size = 24,
  color = '#64748B',
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

    case 'lock':
      return (
        <Svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
        >
          <Path
            fill={color}
            d="M12 1C8.676 1 6 3.676 6 7v1c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v1H8V7c0-2.276 1.724-4 4-4zm0 10c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"
          />
        </Svg>
      );
    case 'mail':
      return (
        <Svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
        >
          <Path fill="none" d="M0 0h24v24H0z" />

          <G
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          >
            <Path d="M4 5h16c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1H4c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1Z" />
            <Path d="m3 6.5 9 5.5 9-5.5" />
          </G>
        </Svg>
      );
    case 'key':
      return (
        <Svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
        >
          <Path
            fill={color}
            d="M7 5a7 7 0 1 0 6.707 9H18v3h4v-3h2v-4H13.707A7 7 0 0 0 7 5zm0 4a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"
          />
        </Svg>
      );
    case 'eye':
      return (
        <Svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
        >
          <Path fill="none" d="M0 0h24v24H0z" />

          <Path
            fill={color}
            d="M12 9a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5 5 5 0 0 1 5-5 5 5 0 0 1 5 5 5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
          />
        </Svg>
      );
    case 'device':
      return (
        <Svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
        >
          <Path fill="none" d="M0 0h24v24H0z" />

          <Path
            fill={color}
            d="M7 23q-.825 0-1.412-.587T5 21V3q0-.825.588-1.412T7 1h10q.825 0 1.413.588T19 3v3.1q.45.175.725.55T20 7.5v2q0 .475-.275.85T19 10.9V21q0 .825-.587 1.413T17 23zm0-2h10V3H7zm0 0V3zm5.713-15.288Q13 5.425 13 5t-.288-.712T12 4t-.712.288T11 5t.288.713T12 6t.713-.288"
          />
        </Svg>
      );
    case 'eye_off':
      return (
        <Svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
        >
          <Path fill="none" d="M0 0h24v24H0z" />

          <Path
            fill={color}
            d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7"
          />
        </Svg>
      );
    case 'check':
      return (
        <Svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
        >
          <Path fill="none" d="M0 0h24v24H0z" />

          <Path
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m5 12l5 5L20 7"
          />
        </Svg>
      );
    case 'arrow_right':
      return (
        <Svg
          width={size}
          height={size}
          viewBox="0 0 1024 1024"
          fill="none"
        >
          <Path d="M0 0h1024v1024H0z" fill="none" />

          <Path
            fill={color}
            d="M754.8 480H160a32 32 0 1 0 0 64h594.8L521.3 777.3a32 32 0 0 0 45.4 45.4l288-288a32 32 0 0 0 0-45.4l-288-288a32 32 0 1 0-45.4 45.4z"
          />
        </Svg>
      );
    case 'google':
      return (
        <Svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
        >
          <Path d="M0 0h24v24H0z" fill="none" />

          <Path
            fill={color}
            d="M3.064 7.51A10 10 0 0 1 12 2c2.695 0 4.959.991 6.69 2.605l-2.867 2.868C14.786 6.482 13.468 5.977 12 5.977c-2.605 0-4.81 1.76-5.595 4.123c-.2.6-.314 1.24-.314 1.9s.114 1.3.314 1.9c.786 2.364 2.99 4.123 5.595 4.123c1.345 0 2.49-.355 3.386-.955a4.6 4.6 0 0 0 1.996-3.018H12v-3.868h9.418c.118.654.182 1.336.182 2.045c0 3.046-1.09 5.61-2.982 7.35C16.964 21.105 14.7 22 12 22A9.996 9.996 0 0 1 2 12c0-1.614.386-3.14 1.064-4.49"
          />
        </Svg>
      );
    case 'apple':
      return (
        <Svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
        >
          <Path d="M0 0h24v24H0z" fill="none" />

          <Path
            fill={color}
            d="M17.05 20.28c-.98.95-2.05.8-3.08.35c-1.09-.46-2.09-.48-3.24 0c-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8c1.18-.24 2.31-.93 3.57-.84c1.51.12 2.65.72 3.4 1.8c-3.12 1.87-2.38 5.98.48 7.13c-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25c.29 2.58-2.34 4.5-3.74 4.25"
          />
        </Svg>
      );
    case 'facebook':
      return (
        <Svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
        >
          <Path d="M0 0h24v24H0z" fill="none" />

          <Path
            fill={color}
            d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
          />
        </Svg>
      );
    case 'shield':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M0 0h24v24H0z" fill="none" />
          <Path
            fill={color}
            d="M12 22q-3.475-.875-5.738-3.988T4 11.1V5l8-3l8 3v6.1q0 3.8-2.262 6.913T12 22m0-2.1q2.6-.825 4.3-3.3t1.7-5.5V6.375l-6-2.25l-6 2.25V11.1q0 3.025 1.7 5.5t4.3 3.3m0-7.9"
          />
        </Svg>
      );
    case 'shield_check':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M0 0h24v24H0z" fill="none" />
          <Path
            fill={color}
            d="M21 11c0 5.55-3.84 10.74-9 12c-5.16-1.26-9-6.45-9-12V5l9-4l9 4zm-9 10c3.75-1 7-5.46 7-9.78V6.3l-7-3.12L5 6.3v4.92C5 15.54 8.25 20 12 21m-2-4l-4-4l1.41-1.41L10 14.17l6.59-6.59L18 9"
          />
        </Svg>
      ); case 'shield_lock':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M0 0h24v24H0z" fill="none" />
          <Path
            fill={color}
            d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12h2q0 1.65.625 3.113t1.713 2.55t2.55 1.725t3.112.637q3.35 0 5.675-2.325T20 12.025T17.675 6.35T12 4.025q-2.225 0-4.038 1.088T5.1 8H8v2H2V4h2v2q1.375-1.825 3.45-2.912T12 2q2.075 0 3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m-2-6q-.425 0-.712-.288T9 15v-3q0-.425.288-.712T10 11v-1q0-.825.588-1.412T12 8t1.413.588T14 10v1q.425 0 .713.288T15 12v3q0 .425-.288.713T14 16zm1-5h2v-1q0-.425-.288-.712T12 9t-.712.288T11 10z"
          />
        </Svg>
      );
      case 'arrow_left':
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
    >
      <Path d="M0 0h48v48H0z" fill="none" />

      <Path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M31 36L19 24l12-12"
      />
    </Svg>
  );
  case 'mail_check':
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path d="M0 0h24v24H0z" fill="none" />

      <G
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <Path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />

        <Path d="m22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7m14 12l2 2l4-4" />
      </G>
    </Svg>
  );
  case 'device_check':
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      <Path d="M0 0h16v16H0z" fill="none" />

      <Path
        fill={color}
        d="M11 10.978v2.272a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75V2.75A.75.75 0 0 1 5.75 2h.507a5.5 5.5 0 0 1 1.08-1H5.75A1.75 1.75 0 0 0 4 2.75v10.5c0 .966.784 1.75 1.75 1.75h4.5A1.75 1.75 0 0 0 12 13.25v-2.457a5.5 5.5 0 0 1-1 .185M6.5 12.5A.5.5 0 0 1 7 12h2a.5.5 0 0 1 0 1H7a.5.5 0 0 1-.5-.5m4-2.5a4.5 4.5 0 1 0 0-9a4.5 4.5 0 0 0 0 9m2.354-5.646l-3 3a.5.5 0 0 1-.708 0l-1-1a.5.5 0 1 1 .708-.708l.646.647l2.646-2.647a.5.5 0 0 1 .708.708"
      />
    </Svg>
  );
    default:
      return null;
  }
};

export default SvgIcon;
