import { COLORS } from '@/constants/theme';
import { driverProfileStyles as styles } from '@/styles/driverProfileStyles';
import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

type DriverFormData = {
  car_model: string;
  car_color: string;
  car_plate: string;
  seats_available: number;
  license_number: string;
};

type Props = {
  formData: DriverFormData;
  onChange: (field: keyof DriverFormData, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

function Field({
  icon,
  label,
  children,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  children: ReactNode;
}) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrap}>
        <Ionicons name={icon} size={18} color={COLORS.textSecondary} />
        {children}
      </View>
    </View>
  );
}

export default function DriverProfileForm({ formData, onChange, onSave, onCancel }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.headerBanner}>
        <View style={styles.avatar}>
          <Ionicons name="create-outline" size={28} color={COLORS.white} />
        </View>
        <Text style={styles.heading}>Edit Driver Profile</Text>
      </View>

      <View style={styles.formBody}>
        <Field icon="car-sport-outline" label="Car Model">
          <TextInput
            style={styles.input}
            value={formData.car_model}
            placeholder="e.g. Suzuki Alto"
            placeholderTextColor={COLORS.textSecondary}
            onChangeText={(t) => onChange('car_model', t)}
          />
        </Field>
        <Field icon="color-palette-outline" label="Car Color">
          <TextInput
            style={styles.input}
            value={formData.car_color}
            placeholder="e.g. White"
            placeholderTextColor={COLORS.textSecondary}
            onChangeText={(t) => onChange('car_color', t)}
          />
        </Field>
        <Field icon="pricetag-outline" label="Car Plate">
          <TextInput
            style={styles.input}
            value={formData.car_plate}
            placeholder="e.g. ISB-1234"
            placeholderTextColor={COLORS.textSecondary}
            autoCapitalize="characters"
            onChangeText={(t) => onChange('car_plate', t)}
          />
        </Field>
        <Field icon="people-outline" label="Seats Available">
          <TextInput
            style={styles.input}
            value={String(formData.seats_available)}
            placeholder="4"
            placeholderTextColor={COLORS.textSecondary}
            keyboardType="numeric"
            onChangeText={(t) => onChange('seats_available', t)}
          />
        </Field>
        <Field icon="card-outline" label="License Number">
          <TextInput
            style={styles.input}
            value={formData.license_number}
            placeholder="Enter license number"
            placeholderTextColor={COLORS.textSecondary}
            onChangeText={(t) => onChange('license_number', t)}
          />
        </Field>

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
