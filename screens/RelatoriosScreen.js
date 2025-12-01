import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RelatoriosScreen() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24 }}>Meus Relatórios</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});