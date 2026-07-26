import { COLORS } from '@/constants/theme';
import { studentProfileStyles as styles } from '@/styles/studentProfileStyles';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, TextInput, View } from 'react-native';

type FormData = { full_name: string; university_name: string; phone: string };

type Props = {
  formData: FormData;
  onChange: (field: string, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

export default function StudentProfileForm({ formData, onChange, onSave, onCancel }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.headerBanner}>
        <View style={styles.avatar}>
          <Ionicons name="create-outline" size={28} color={COLORS.white} />
        </View>
        <Text style={styles.heading}>Edit Student Profile</Text>
      </View>

      <View style={styles.formBody}>
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputWrap}>
            <Ionicons name="person-outline" size={18} color={COLORS.textSecondary} />
            <TextInput
              style={styles.input}
              value={formData.full_name}
              onChangeText={(t) => onChange('full_name', t)}
              placeholder="Full name"
              placeholderTextColor={COLORS.textSecondary}
            />
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>University</Text>
          <View style={styles.inputWrap}>
            <Ionicons name="school-outline" size={18} color={COLORS.textSecondary} />
            <TextInput
              style={styles.input}
              value={formData.university_name}
              onChangeText={(t) => onChange('university_name', t)}
              placeholder="University"
              placeholderTextColor={COLORS.textSecondary}
            />
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Phone</Text>
          <View style={styles.inputWrap}>
            <Ionicons name="call-outline" size={18} color={COLORS.textSecondary} />
            <TextInput
              style={styles.input}
              value={formData.phone}
              onChangeText={(t) => onChange('phone', t)}
              placeholder="Phone"
              placeholderTextColor={COLORS.textSecondary}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <View style={styles.buttonRow}>
          <Pressable style={[styles.button, styles.cancelButton]} onPress={onCancel}>
            <Ionicons name="close" size={16} color={COLORS.textSecondary} />
            <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.saveButton]} onPress={onSave}>
            <Ionicons name="checkmark" size={16} color={COLORS.white} />
            <Text style={[styles.buttonText, styles.saveButtonText]}>Save</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
