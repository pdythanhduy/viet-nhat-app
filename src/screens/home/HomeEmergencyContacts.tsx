// Home — emergency contacts list at the bottom of the screen. Renders
// the cards inside their own container; the section title + "Mở trung
// tâm khẩn" link stay in HomeScreen so they share the existing
// section-title row styling.

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../constants/colors';
import { EMERGENCY_CONTACTS } from '../../constants/content/emergency';

interface HomeEmergencyContactsProps {
  onCall: (number: string) => void;
}

export function HomeEmergencyContacts({ onCall }: HomeEmergencyContactsProps) {
  return (
    <View style={styles.emergencyContainer}>
      {EMERGENCY_CONTACTS.map((contact) => (
        <TouchableOpacity
          key={contact.id}
          style={styles.emergencyCard}
          onPress={() => onCall(contact.number)}
        >
          <View style={[styles.emergencyIcon, { backgroundColor: `${contact.color}18` }]}>
            <Ionicons name={contact.icon} size={22} color={contact.color} />
          </View>
          <View style={styles.emergencyInfo}>
            <Text style={styles.emergencyName}>{contact.name}</Text>
            <Text style={styles.emergencyNameJp}>{contact.nameJp}</Text>
            <Text style={[styles.emergencyNumber, { color: contact.color }]}>
              {contact.number}
            </Text>
          </View>
          <Ionicons name="call" size={18} color={contact.color} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  emergencyContainer: { gap: 10 },
  emergencyCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  emergencyIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emergencyInfo: { flex: 1 },
  emergencyName: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
  },
  emergencyNameJp: { fontSize: 11, color: Colors.textMuted, marginTop: 1 },
  emergencyNumber: {
    fontSize: 15,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    marginTop: 3,
  },
});
