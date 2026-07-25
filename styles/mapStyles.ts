import { COLORS } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  map: { width: '100%', height: '100%' },
  attribution: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 10,
    color: '#666',
  },
  userDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#3B82F6',
    borderWidth: 2,
    borderColor: '#fff',
  },
  pin: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  markerWrap: {
    alignItems: 'center',
  },
  markerLabel: {
    marginTop: 4,
    backgroundColor: 'rgba(17, 24, 39, 0.85)',
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
  },
  pinContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinRing: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  markerLabelLive: {
    backgroundColor: 'rgba(37, 99, 235, 0.9)',
  },
});
