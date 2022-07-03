import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export const COLORS = {
  blue: '#006cff',
  white: '#ffffff',
  darkBlue: '#0f172b',
  red: '#fe4c49',
  green: '#3dcfb0',
  grey: '#737583',
};

export const FONTS = {
  h1: {
    fontSize: 20,
    fontWeight: '700' as '700',
  },
  h2: {
    fontSize: 16,
    fontWeight: '600' as '600',
  },
  h3: {
    fontSize: 12,
    fontWeight: '500' as '500',
  },
  h4: {
    fontSize: 10,
    fontWeight: '500' as '500',
  },
};

export const SIZES = {
  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,
  BUTTON_HEIGHT: 50,
  SQUARE_BUTTON_HEIGHT: 70,
};
