import { COLORS, FONT_SIZES, SPACING } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import DriverProfile from './driverProfile';
import StudentProfile from './studentProfile';

export default function ProfileScreen() {
  const [role, setRole] = useState<'student' | 'driver'>('student');

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Pressable
          style={[styles.switchBtn, role === 'student' && styles.active]}
          onPress={() => setRole('student')}
        >
          <Ionicons
            name="person"
            size={16}
            color={role === 'student' ? COLORS.white : COLORS.textSecondary}
          />
          <Text style={[styles.switchText, role === 'student' && styles.activeText]}>Student</Text>
        </Pressable>

        <Pressable
          style={[styles.switchBtn, role === 'driver' && styles.active]}
          onPress={() => setRole('driver')}
        >
          <Ionicons
            name="car-sport"
            size={16}
            color={role === 'driver' ? COLORS.white : COLORS.textSecondary}
          />
          <Text style={[styles.switchText, role === 'driver' && styles.activeText]}>Driver</Text>
        </Pressable>
      </View>
      {role === 'student' ? <StudentProfile /> : <DriverProfile />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: SPACING.xl + SPACING.md,
  },
  switchContainer: {
    flexDirection: 'row',
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.white,
    borderRadius: 999,
    padding: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  switchBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: SPACING.sm,
    borderRadius: 999,
  },
  active: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  switchText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  activeText: {
    color: COLORS.white,
  },
});
