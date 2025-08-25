export const colors = {
  primary: {
    50: '#669AFF',
    55: '#4B8BFF',
  },
  secondary: {
    50: '#FBA907',
    10: '#FFF4DE',
  },
  static: {
    black: '#000000',
    white: '#FFFFFF',
  },
  status: {
    red: '#FF6648',
  },
  neutral: {
    20: '#F7F7F7',
    30: '#F4F4F4',
    40: '#E9E9EC',
    50: '#D3D3D3',
    60: '#ABABAB',
    70: '#818181',
    80: '#707070',
    90: '#555555',
    100: '#333333',
    110: '#111111',
    120: '#010101',
  },
  coolGray: {
    20: '#F0F5FB',
    50: '#A3ABBE',
    80: '#3E3F48',
  },
};

export const COLORS = {
  primary: colors['primary'][50],
  secondary: colors['secondary'][50],
  neutral: colors['neutral'][50],
  white: colors['static']['white'],
  black: colors['static']['black'],
};

export type Colors = keyof typeof colors;
export type IconColor = keyof typeof COLORS;
export const colorNames = Object.keys(colors) as Colors[];
