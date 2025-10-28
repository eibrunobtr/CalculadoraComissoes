import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    // O View é como uma 'div' no React Native. Ele é o container da tela.
    <View style={styles.container}>
      
      {/* Título principal do aplicativo de turismo */}
      <Text style={styles.title}>
        Descubra o Espirito Santo!
      </Text>
      
      {/* Mensagem de boas-vindas / Subtítulo */}
      <Text style={styles.subtitle}>
        Seu guia de turismo capixaba na palma da sua mão
      </Text>

      {/* Exibe uma saudação simples */}
      <Text style={styles.bodyText}>
        Bem-vindo! Comece a explorar seus destinos.
      </Text>

      {/* O StatusBar permite controlar a barra de status do celular (hora, bateria, etc) */}
      <StatusBar style="auto" /> 
    </View>
  );
}

// Estilos usando StyleSheet (similar a CSS, mas com sintaxe JavaScript)
const styles = StyleSheet.create({
  container: {
    flex: 1,                 // Ocupa toda a tela
    backgroundColor: '#ADD8E6', // Cor de fundo suave (ex: azul claro)
    alignItems: 'center',    // Centraliza o conteúdo horizontalmente
    justifyContent: 'center',// Centraliza o conteúdo verticalmente
    padding: 20,             // Espaçamento interno
  },
  title: {
    fontSize:40             // Tamanho da fonte grande
    fontWeight: 'bold',       // Negrito
    color: '#FFFF00',         // Cor principal (ex: azul turquesa)
    marginBottom: 10,         // Espaço abaixo do título
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  bodyText: {
    fontSize: 16,
    color: '#555',
  }
});

// Para rodar este projeto, execute no terminal: npx expo start