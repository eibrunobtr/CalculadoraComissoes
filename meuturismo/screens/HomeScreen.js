// screens/HomeScreen.js

import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// Dados de exemplo
const touristSpots = [
  { id: '1', name: 'Praia do Sol', description: 'Linda praia com areia branca.' },
  { id: '2', name: 'Museu Histórico', description: 'Coleção de artefatos antigos.' },
  { id: '3', name: 'Parque das Flores', description: 'Ótimo para caminhadas e piqueniques.' },
];

export default function HomeScreen({ navigation }) {
  // Função para navegar para a tela de detalhes
  const goToDetails = (spot) => {
    // Passa os dados do local como 'params' para a tela de detalhes
    navigation.navigate('Details', { 
      id: spot.id,
      name: spot.name,
      description: spot.description,
      // ...adicione outras propriedades aqui (imagem, localização, etc.)
    });
  };

  // Componente para renderizar cada item na lista
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => goToDetails(item)}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <Text style={styles.cardLink}>Ver Detalhes »</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={touristSpots}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  cardLink: {
    fontSize: 14,
    color: '#007BFF',
    marginTop: 5,
    fontWeight: '600',
  }
});