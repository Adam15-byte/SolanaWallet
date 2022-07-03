import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  blue: '#006cff',
  white: '#ffffff',
  darkBlue: '#0f172b',
  red: '#fe4c49',
  green: '#00e9ab',
  blueSolLogo: '#6f8bd4',
  pink: '#bf32f5',
  grey: '#737583',
};

export const FONTS = {
  h1: {
    fontSize: 28,
    fontWeight: '700' as '700',
  },
  h2: {
    fontSize: 20,
    fontWeight: '600' as '600',
  },
  h3: {
    fontSize: 16,
    fontWeight: '500' as '500',
  },
  h4: {
    fontSize: 12,
    fontWeight: '500' as '500',
  },
  h5: {
    fontSize: 10,
    fontWeight: '400' as '400',
  },
};

export const SIZES = {
  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,
  BUTTON_HEIGHT: 50,
  SQUARE_BUTTON_HEIGHT: 70,
  ICON_SIZE: 20,
};
