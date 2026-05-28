import { CheckCircle2 } from 'lucide-react-native';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/colors';
import { hig } from '@/constants/hig';

type SuccessModalProps = {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
};

export function SuccessModal({ visible, title, message, onClose }: SuccessModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      accessibilityViewIsModal>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <CheckCircle2 size={56} color={colors.primary} accessibilityLabel="Success" />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <Pressable
            onPress={onClose}
            style={styles.button}
            accessibilityRole="button"
            accessibilityLabel="Done">
            <Text style={styles.buttonText}>Done</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: hig.spacing.xl,
  },
  card: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: colors.white,
    borderRadius: hig.radius.xl,
    padding: hig.spacing.xl,
    alignItems: 'center',
    gap: hig.spacing.md,
  },
  title: {
    fontSize: hig.typography.title3,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  message: {
    fontSize: hig.typography.subheadline,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    marginTop: hig.spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: hig.radius.md,
    minHeight: hig.minTouchTarget,
    minWidth: 140,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: hig.spacing.lg,
  },
  buttonText: {
    color: colors.white,
    fontSize: hig.typography.headline,
    fontWeight: '600',
  },
});
