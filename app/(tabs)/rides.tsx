import CreateRideForm from '@/components/rides/CreateRideForm';
import RequestRideModal from '@/components/rides/RequestRideModal';
import RideCard from '@/components/rides/RideCard';
import { COLORS, FONT_SIZES, SPACING } from '@/constants/theme';
import { useProfile } from '@/hooks/ProfileContextHook';
import { supabase } from '@/lib/supabase';
import { Ride } from '@/types/Profiles';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function RidesScreen() {
  const { activeMode, session, isDriver } = useProfile();
  const isDriverMode = activeMode === 'driver';

  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  // track which rides the student has already requested, so we can disable the button
  const [requestedRideIds, setRequestedRideIds] = useState<Set<string>>(new Set());
  // block further requests from student if they already have an accepted ride
  const [hasAcceptedRequest, setHasAcceptedRequest] = useState(false);
  const [hasActiveRide, setHasActiveRide] = useState(false);

  const fetchRides = async () => {
    setLoading(true);
    let query = supabase.from('rides').select('*').order('departure_time', { ascending: true });

    if (isDriverMode) {
      // Drivers see only their own rides; students see all active rides
      query = query.eq('driver_id', session!.user.id);
    } else {
      query = query
        .eq('status', 'active')
        .gt('seats_available', 0)
        .neq('driver_id', session!.user.id);
    }

    const { data, error } = await query;
    setLoading(false);
    if (!error && data) {
      setRides(data as Ride[]);
      // stop drivers from posting multiple active rides
      if (isDriverMode) {
        setHasActiveRide(data.some((r) => r.status === 'active'));
      }
    }
    if (!isDriverMode && session?.user?.id) {
      const { data: myRequests } = await supabase
        .from('ride_requests')
        .select('ride_id, status')
        .eq('student_id', session.user.id)
        .in('status', ['pending', 'accepted']);

      if (myRequests) {
        setRequestedRideIds(new Set(myRequests.map((r) => r.ride_id)));
        setHasAcceptedRequest(myRequests.some((r) => r.status === 'accepted'));
      }
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRides();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchRides();
    }, [isDriverMode])
  );

  const handleRequestRide = (ride: Ride) => {
    if (hasAcceptedRequest) {
      Alert.alert(
        'Request Blocked',
        'You already have an accepted ride. You cannot request another until it is completed or cancelled.'
      );
      return;
    }
    setSelectedRide(ride);
    setModalVisible(true);
  };

  if (isDriverMode && showCreateForm) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.background }}>
        <Pressable style={styles.backBtn} onPress={() => setShowCreateForm(false)}>
          <Ionicons name="arrow-back" size={16} color={COLORS.primary} />
          <Text style={styles.backText}>Back to My Rides</Text>
        </Pressable>
        <CreateRideForm
          onRideCreated={() => {
            setShowCreateForm(false);
            fetchRides();
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{isDriverMode ? 'My Rides' : 'Available Rides'}</Text>
          <Text style={styles.subtitle}>
            {isDriverMode
              ? `${rides.length} ride${rides.length === 1 ? '' : 's'} posted`
              : `${rides.length} ride${rides.length === 1 ? '' : 's'} nearby`}
          </Text>
        </View>
        {isDriverMode &&
          (hasActiveRide ? (
            <View style={styles.lockedPill}>
              <Ionicons name="lock-closed-outline" size={13} color={COLORS.textSecondary} />
              <Text style={styles.activeRideText}>Ride active</Text>
            </View>
          ) : (
            <Pressable style={styles.createBtn} onPress={() => setShowCreateForm(true)}>
              <Ionicons name="add" size={16} color={COLORS.white} />
              <Text style={styles.createBtnText}>New Ride</Text>
            </Pressable>
          ))}
      </View>

      {loading && !refreshing ? (
        <ActivityIndicator color={COLORS.primary} style={{ marginTop: SPACING.xl }} />
      ) : (
        <FlatList
          data={rides}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            !isDriverMode && !isDriver ? (
              <Pressable
                style={styles.driverBanner}
                onPress={() => router.push('/(tabs)/profiles/driverProfile')}
              >
                <View style={styles.driverBannerIcon}>
                  <Ionicons name="car-sport-outline" size={20} color={COLORS.primary} />
                </View>
                <View style={styles.driverBannerText}>
                  <Text style={styles.driverBannerTitle}>Want to offer rides?</Text>
                  <Text style={styles.driverBannerDesc}>
                    Complete your driver profile to start posting rides
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={COLORS.primary} />
              </Pressable>
            ) : null
          }
          renderItem={({ item }) => (
            <RideCard
              ride={item}
              actionLabel={isDriverMode ? undefined : 'Request Ride'}
              onAction={isDriverMode ? undefined : handleRequestRide}
              alreadyRequested={!isDriverMode && requestedRideIds.has(item.id)}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons
                name={isDriverMode ? 'car-sport-outline' : 'search-outline'}
                size={32}
                color={COLORS.textSecondary}
              />
              <Text style={styles.empty}>
                {isDriverMode ? 'No rides posted yet.' : 'No rides available right now.'}
              </Text>
            </View>
          }
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}

      <RequestRideModal
        ride={selectedRide}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onRequested={fetchRides}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: SPACING.md,
    paddingTop: SPACING.xl + SPACING.md,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: FONT_SIZES.sm - 1,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  createBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  createBtnText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: FONT_SIZES.sm,
  },
  lockedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 6,
    borderRadius: 999,
  },
  list: {
    padding: SPACING.md,
    paddingTop: 0,
  },
  empty: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.md,
  },
  emptyState: {
    alignItems: 'center',
    gap: SPACING.sm,
    marginTop: SPACING.xl,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: SPACING.md,
    paddingTop: SPACING.xl + SPACING.md,
  },
  backText: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  driverBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.primary,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  driverBannerIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverBannerText: {
    flex: 1,
    gap: 2,
  },
  driverBannerTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
    color: COLORS.primary,
  },
  driverBannerDesc: {
    fontSize: FONT_SIZES.sm - 1,
    color: COLORS.textSecondary,
  },
  activeRideText: {
    fontSize: FONT_SIZES.sm - 1,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
});
