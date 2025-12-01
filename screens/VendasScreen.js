import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function VendasScreen() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24 }}>Tela de Lançar Vendas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});