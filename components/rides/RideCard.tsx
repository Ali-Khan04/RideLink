import { COLORS, FONT_SIZES, SPACING } from '@/constants/theme';
import { Ride } from '@/types/Profiles';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  ride: Ride;
  actionLabel?: string;
  onAction?: (ride: Ride) => void;
  disabled?: boolean;
  alreadyRequested?: boolean;
}

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  active: { bg: '#D1FAE5', text: '#065F46' },
  full: { bg: '#FEF3C7', text: '#92400E' },
  completed: { bg: '#E5E7EB', text: '#374151' },
  cancelled: { bg: '#FEE2E2', text: '#991B1B' },
};

export default function RideCard({
  ride,
  actionLabel,
  onAction,
  disabled,
  alreadyRequested,
}: Props) {
  const departure = new Date(ride.departure_time).toLocaleString();
  const statusColor = STATUS_COLORS[ride.status] ?? STATUS_COLORS.active;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.routeBlock}>
          <View style={styles.routeRow}>
            <View style={styles.routeDot} />
            <Text style={styles.routeText} numberOfLines={1}>
              {ride.pickup_label}
            </Text>
          </View>
          <View style={styles.routeConnector} />
          <View style={styles.routeRow}>
            <Ionicons name="location" size={13} color="#EF4444" />
            <Text style={styles.routeText} numberOfLines={1}>
              {ride.destination_label}
            </Text>
          </View>
        </View>

        <View style={[styles.badge, { backgroundColor: statusColor.bg }]}>
          <Text style={[styles.badgeText, { color: statusColor.text }]}>{ride.status}</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Ionicons name="time-outline" size={14} color={COLORS.textSecondary} />
          <Text style={styles.metaText}>{departure}</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="people-outline" size={14} color={COLORS.textSecondary} />
          <Text style={styles.metaText}>{ride.seats_available} seats left</Text>
        </View>
      </View>

      {actionLabel && onAction && (
        <Pressable
          style={[styles.button, (disabled || alreadyRequested) && styles.buttonDisabled]}
          onPress={() => !alreadyRequested && onAction(ride)}
          disabled={disabled || alreadyRequested}
        >
          <Text style={styles.buttonText}>
            {alreadyRequested ? 'Already Requested' : actionLabel}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
  routeBlock: { flex: 1 },
  routeRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.xs },
  routeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginHorizontal: 2.5,
  },
  routeConnector: {
    width: 1,
    height: 10,
    marginLeft: 6.5,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.border,
    borderStyle: 'dashed',
  },
  routeText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textPrimary,
    fontWeight: '600',
    flexShrink: 1,
  },
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 99,
  },
  badgeText: {
    fontSize: FONT_SIZES.sm - 3,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metaRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    paddingTop: SPACING.xs,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metaText: { fontSize: FONT_SIZES.sm - 1, color: COLORS.textSecondary },
  button: {
    marginTop: 2,
    backgroundColor: COLORS.primary,
    padding: SPACING.sm + 2,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: COLORS.border,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: FONT_SIZES.sm,
  },
});
