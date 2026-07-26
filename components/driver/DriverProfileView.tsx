import { COLORS } from '@/constants/theme';
import { driverProfileStyles as styles } from '@/styles/driverProfileStyles';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

type DriverData = {
  car_model?: string;
  car_color?: string;
  car_plate?: string;
  seats_available?: number;
  license_number?: string;
};

type Props = { driverProfile: DriverData | null; onEdit: () => void };

const FIELDS: {
  key: keyof DriverData;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  fallback: string;
}[] = [
  {
    key: 'car_model',
    label: 'Car Model',
    icon: 'car-sport-outline',
    fallback: 'Tap to add your car model',
  },
  {
    key: 'car_color',
    label: 'Car Color',
    icon: 'color-palette-outline',
    fallback: 'Tap to add your car color',
  },
  {
    key: 'car_plate',
    label: 'Car Plate',
    icon: 'pricetag-outline',
    fallback: 'Tap to add your car plate',
  },
  { key: 'seats_available', label: 'Seats Available', icon: 'people-outline', fallback: '4' },
  {
    key: 'license_number',
    label: 'License Number',
    icon: 'card-outline',
    fallback: 'Tap to add your license number',
  },
];

export default function DriverProfileView({ driverProfile, onEdit }: Props) {
  return (
    <Pressable style={styles.card} onPress={onEdit}>
      <View style={styles.headerBanner}>
        <View style={styles.avatar}>
          <Ionicons name="car-sport" size={30} color={COLORS.white} />
        </View>
        <Text style={styles.heading}>Driver Profile</Text>
        <Text style={styles.subheading}>{driverProfile?.car_model || 'Car details'}</Text>
      </View>

      <View style={styles.body}>
        {FIELDS.map((f, i) => {
          const raw = driverProfile?.[f.key];
          const hasValue = !!raw;
          return (
            <View key={f.key} style={[styles.row, i === FIELDS.length - 1 && styles.rowLast]}>
              <View style={styles.rowIcon}>
                <Ionicons name={f.icon} size={18} color={COLORS.primary} />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.label}>{f.label}</Text>
                <Text style={[styles.value, !hasValue && styles.placeholder]}>
                  {hasValue ? String(raw) : f.fallback}
                </Text>
              </View>
            </View>
          );
        })}
        <Text style={styles.editHint}>Tap anywhere to edit →</Text>
      </View>
    </Pressable>
  );
}
