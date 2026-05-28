import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/AppHeader';
import { DoctorCard } from '@/components/DoctorCard';
import { EmptyState } from '@/components/EmptyState';
import { SearchBar } from '@/components/SearchBar';
import { SpecialtyChip } from '@/components/SpecialtyChip';
import { colors } from '@/constants/colors';
import { SPECIALTY_FILTERS, type SpecialtyFilter } from '@/constants/specialties';
import { hig } from '@/constants/hig';
import { fetchDoctors } from '@/services/doctorService';
import type { Doctor } from '@/types/doctor';
import { filterDoctors } from '@/utils/filterDoctors';

export function HomeScreen() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<SpecialtyFilter>('All');

  const loadDoctors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchDoctors();
      setDoctors(data);
    } catch {
      setError('Could not load doctors. Is json-server running on port 3000?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDoctors();
  }, [loadDoctors]);

  const filteredDoctors = useMemo(
    () => filterDoctors(doctors, searchQuery, selectedSpecialty),
    [doctors, searchQuery, selectedSpecialty],
  );

  const renderDoctor = useCallback(
    ({ item, index }: { item: Doctor; index: number }) => (
      <DoctorCard doctor={item} index={index} />
    ),
    [],
  );

  const keyExtractor = useCallback((item: Doctor) => String(item.id), []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.fixedHeader}>
        <AppHeader />
        <View style={styles.searchWrapper}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search name, specialty, or hospital..."
          />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}>
          {SPECIALTY_FILTERS.map((specialty) => (
            <SpecialtyChip
              key={specialty}
              label={specialty}
              selected={selectedSpecialty === specialty}
              onPress={() => setSelectedSpecialty(specialty)}
            />
          ))}
        </ScrollView>
        {!loading && !error && filteredDoctors.length > 0 ? (
          <Text style={styles.resultsCount}>
            {filteredDoctors.length} doctor{filteredDoctors.length === 1 ? '' : 's'} found
          </Text>
        ) : null}
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading doctors...</Text>
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={filteredDoctors}
          keyExtractor={keyExtractor}
          renderItem={renderDoctor}
          ListEmptyComponent={<EmptyState />}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  fixedHeader: {
    backgroundColor: colors.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  searchWrapper: {
    paddingHorizontal: hig.spacing.lg,
    paddingBottom: hig.spacing.sm,
  },
  chipsRow: {
    paddingHorizontal: hig.spacing.lg,
    paddingBottom: hig.spacing.md,
  },
  resultsCount: {
    paddingHorizontal: hig.spacing.lg,
    paddingBottom: hig.spacing.sm,
    fontSize: hig.typography.footnote,
    fontWeight: '600',
    color: colors.textMuted,
  },
  listContent: {
    paddingHorizontal: hig.spacing.lg,
    paddingTop: hig.spacing.md,
    paddingBottom: hig.spacing.xxl,
  },
  separator: {
    height: hig.spacing.md,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: hig.spacing.xl,
    gap: hig.spacing.md,
  },
  loadingText: {
    fontSize: hig.typography.subheadline,
    color: colors.textMuted,
  },
  errorText: {
    fontSize: hig.typography.subheadline,
    color: '#DC2626',
    textAlign: 'center',
    lineHeight: 22,
  },
});
