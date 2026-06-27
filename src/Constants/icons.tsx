const icons = {
  chat: require('../../src/assets/Images/chat.png'),
  call: require('../../src/assets/Images/call.png'),
  user_account: require('../../src/assets/Images/user-account.png'),
  ComingSoon: require('../../src/assets/Images/ComingSoon.png'),
  bell: require('../../src/assets/Images/bell.png'),
} as const;

export type IconsType = typeof icons;

export default icons;