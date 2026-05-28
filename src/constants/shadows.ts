import { Platform, type ViewStyle } from 'react-native';

export const cardShadow: ViewStyle = Platform.select({
  ios: {
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
  },
  android: {
    elevation: 4,
  },
  default: {},
}) as ViewStyle;
