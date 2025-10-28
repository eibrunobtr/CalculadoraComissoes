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
// screens/HomeScreen.js

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  ImageBackground // 1. Importe o ImageBackground
} from 'react-native';

// Dados de exemplo (mesmo de antes)
const touristSpots = [
  { id: '1', name: 'Praia do Sol', description: 'Linda praia com areia branca.' },
  { id: '2', name: 'Museu Histórico', description: 'Coleção de artefatos antigos.' },
  { id: '3', name: 'Parque das Flores', description: 'Ótimo para caminhadas e piqueniques.' },
];

// 2. Coloque o caminho para sua imagem aqui
const backgroundImage = require('./background.jpg'); 

export default function HomeScreen({ navigation }) {
  
  const goToDetails = (spot) => {
    navigation.navigate('Details', { 
      id: spot.id,
      name: spot.name,
      description: spot.description,
    });
  };

  const renderItem = ({ item }) => (
    // Os cartões continuam os mesmos
    <TouchableOpacity style={styles.card} onPress={() => goToDetails(item)}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <Text style={styles.cardLink}>Ver Detalhes »</Text>
    </TouchableOpacity>
  );

  return (
    // 3. Troque o <View> principal por <ImageBackground>
    <ImageBackground 
      source={backgroundImage} 
      resizeMode="cover" // Garante que a imagem cubra a tela (cover, stretch, contain)
      style={styles.imageBackground} // Precisa de flex: 1 para preencher a tela
    >
      <FlatList
        data={touristSpots}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        // Adicionamos um estilo para o conteúdo da lista
        contentContainerStyle={styles.listContent}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // 4. Estilo para o ImageBackground preencher a tela
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  // Estilo para a área de conteúdo da FlatList (para dar espaçamento)
  listContent: {
    padding: 10,
  },
  // Estilos dos cartões (semelhante ao anterior)
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fundo do cartão semi-transparente
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