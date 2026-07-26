import { COLORS, FONT_SIZES, SPACING } from '@/constants/theme';
import { useProfile } from '@/hooks/ProfileContextHook';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';

export default function SwitchModeButton() {
  const { activeMode, isDriver, setActiveMode } = useProfile();

  // Only show switch button if user has a driver profile (otherwise nothing to switch to)
  if (!isDriver) return null;

  const targetMode = activeMode === 'student' ? 'driver' : 'student';
  const label = activeMode === 'student' ? 'Driver mode' : 'Student mode';
  const icon = activeMode === 'student' ? 'car-sport-outline' : 'school-outline';

  return (
    <Pressable style={styles.btn} onPress={() => setActiveMode(targetMode)}>
      <Ionicons name={icon} size={15} color={COLORS.primary} />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: SPACING.sm + 2,
    paddingVertical: 6,
  },
  label: {
    fontSize: FONT_SIZES.sm - 1,
    fontWeight: '700',
    color: COLORS.primary,
  },
});
