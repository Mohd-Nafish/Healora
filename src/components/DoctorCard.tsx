import { Image } from 'expo-image';
import { router } from 'expo-router';
import {
  Briefcase,
  ChevronRight,
  MapPin,
  Star,
} from 'lucide-react-native';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { colors } from '@/constants/colors';
import type { Doctor } from '@/types/doctor';
import { doctorToParams } from '@/types/navigation';
import { formatHospitalName } from '@/utils/formatHospital';
import { getSpecialtyIcon } from '@/utils/specialtyIcon';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const IMAGE_SIZE = 76;
const FEE_PANEL_WIDTH = 72;
const ACCENT = '#1B6AF5';
const NAVY = '#1A2B48';
const MUTED = '#7D8BB0';

type DoctorCardProps = {
  doctor: Doctor;
  index?: number;
};

type StatChipProps = {
  icon: ReactNode;
  value: string;
  label: string;
};

function StatChip({ icon, value, label }: StatChipProps) {
  return (
    <View style={styles.statChip}>
      {icon}
      <View style={styles.statTextCol}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel} numberOfLines={1}>
          {label}
        </Text>
      </View>
    </View>
  );
}

export function DoctorCard({ doctor, index = 0 }: DoctorCardProps) {
  const scale = useSharedValue(1);
  const SpecialtyIcon = getSpecialtyIcon(doctor.specialty);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const openDetails = () => {
    router.push({
      pathname: '/doctor-details',
      params: doctorToParams(doctor),
    });
  };

  return (
    <Animated.View entering={FadeInDown.duration(400).delay(Math.min(index * 50, 250))}>
      <AnimatedPressable
        onPress={openDetails}
        onPressIn={() => {
          scale.value = withSpring(0.98, { damping: 18, stiffness: 320 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 18, stiffness: 320 });
        }}
        style={[styles.card, animatedStyle]}
        accessibilityRole="button"
        accessibilityLabel={`View details for ${doctor.name}, ${doctor.specialty}`}>
        <Image
          source={{ uri: doctor.image }}
          style={styles.avatar}
          contentFit="cover"
          transition={280}
        />

        <View style={styles.main}>
          <Text style={styles.name} numberOfLines={2}>
            {doctor.name}
          </Text>

          <View style={styles.specialtyBadge}>
            <SpecialtyIcon size={12} color={ACCENT} strokeWidth={2.2} />
            <Text style={styles.specialtyText} numberOfLines={1}>
              {doctor.specialty}
            </Text>
          </View>

          <View style={styles.locationRow}>
            <MapPin size={12} color={MUTED} style={styles.locationIcon} />
            <Text style={styles.hospital} numberOfLines={2} ellipsizeMode="tail">
              {formatHospitalName(doctor.hospital)}
            </Text>
          </View>

          <View style={styles.statsRow}>
            <StatChip
              icon={<Star size={13} color="#F5B301" fill="#F5B301" />}
              value={doctor.rating.toFixed(1)}
              label="Rating"
            />
            <StatChip
              icon={<Briefcase size={13} color={ACCENT} strokeWidth={2} />}
              value={String(doctor.experience)}
              label="Years Exp."
            />
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.feePanel}>
          <Text style={styles.feeLabel}>Consultation Fee</Text>
          <Text style={styles.fee} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.85}>
            ${doctor.fee.toFixed(2)}
          </Text>
          <View style={styles.chevronButton}>
            <ChevronRight size={18} color={ACCENT} strokeWidth={2.5} />
          </View>
        </View>
      </AnimatedPressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingVertical: 12,
    paddingLeft: 12,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: '#E8EDF5',
    shadowColor: '#1A2B48',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  avatar: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 12,
    backgroundColor: '#EEF4FF',
    marginRight: 10,
    flexShrink: 0,
  },
  main: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    paddingRight: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: NAVY,
    letterSpacing: -0.2,
    lineHeight: 20,
    marginBottom: 5,
  },
  specialtyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
    backgroundColor: '#EEF4FF',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 5,
    maxWidth: '100%',
  },
  specialtyText: {
    fontSize: 11,
    fontWeight: '600',
    color: ACCENT,
    flexShrink: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 3,
    marginBottom: 8,
  },
  locationIcon: {
    marginTop: 1,
    flexShrink: 0,
  },
  hospital: {
    flex: 1,
    fontSize: 11,
    lineHeight: 14,
    color: MUTED,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  statChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#F4F6FA',
    borderWidth: 1,
    borderColor: '#E8EDF5',
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 7,
    minHeight: 40,
  },
  statTextCol: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 13,
    fontWeight: '700',
    color: NAVY,
    lineHeight: 16,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: MUTED,
    lineHeight: 12,
    marginTop: 1,
  },
  divider: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: '#E8EDF5',
    marginHorizontal: 8,
    marginVertical: 4,
    flexShrink: 0,
  },
  feePanel: {
    width: FEE_PANEL_WIDTH,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 2,
  },
  feeLabel: {
    fontSize: 9,
    fontWeight: '500',
    color: MUTED,
    textAlign: 'center',
    lineHeight: 12,
  },
  fee: {
    fontSize: 16,
    fontWeight: '800',
    color: ACCENT,
    letterSpacing: -0.3,
    textAlign: 'center',
    width: '100%',
  },
  chevronButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#EEF4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
});
