import { COLORS } from '@/constants/theme';
import { studentProfileStyles as styles } from '@/styles/studentProfileStyles';
import { cleanValue } from '@/utils/cleanValue';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

type ProfileData = {
  email?: string;
  full_name?: string | null;
  university_name?: string | null;
  phone?: string | null;
};

type Props = { profile: ProfileData; onEdit: () => void };

export default function StudentProfileView({ profile, onEdit }: Props) {
  const name = cleanValue(profile?.full_name);
  const initial = (name?.charAt(0) || profile.email?.charAt(0) || '?').toUpperCase();

  const fields = [
    {
      icon: 'person-outline' as const,
      label: 'Name',
      value: name,
      fallback: 'Tap to add your name',
    },
    {
      icon: 'school-outline' as const,
      label: 'University',
      value: cleanValue(profile?.university_name),
      fallback: 'Tap to add your university',
    },
    {
      icon: 'call-outline' as const,
      label: 'Phone',
      value: cleanValue(profile?.phone),
      fallback: 'Tap to add your phone number',
    },
    { icon: 'mail-outline' as const, label: 'Email', value: profile.email, fallback: '—' },
  ];

  return (
    <Pressable style={styles.card} onPress={onEdit}>
      <View style={styles.headerBanner}>
        <View style={styles.avatar}>
          <Text style={styles.avatarInitial}>{initial}</Text>
        </View>
        <Text style={styles.heading}>{name || 'Student Profile'}</Text>
        <Text style={styles.subheading}>
          {cleanValue(profile?.university_name) || 'Add your university'}
        </Text>
      </View>

      <View style={styles.body}>
        {fields.map((f, i) => (
          <View key={f.label} style={[styles.row, i === fields.length - 1 && styles.rowLast]}>
            <View style={styles.rowIcon}>
              <Ionicons name={f.icon} size={18} color={COLORS.primary} />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.label}>{f.label}</Text>
              <Text style={[styles.value, !f.value && styles.placeholder]}>
                {f.value || f.fallback}
              </Text>
            </View>
          </View>
        ))}
        <Text style={styles.editHint}>Tap anywhere to edit →</Text>
      </View>
    </Pressable>
  );
}
