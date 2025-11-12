import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'; // Importa o useState
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

// 1. IMPORTE O "auth" DO SEU ARQUIVO DE CONFIGURAÇÃO
import { auth } from './firebaseConfig'; 

// 2. IMPORTE A FUNÇÃO DE "CRIAR USUÁRIO" DO FIREBASE
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function App() {
  // 3. CRIA ESTADOS PARA GUARDAR O E-MAIL E A SENHA
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 4. FUNÇÃO QUE SERÁ CHAMADA QUANDO O BOTÃO FOR PRESSIONADO
  const handleSignUp = () => {
    // 5. ESSA É A FUNÇÃO DO FIREBASE EM AÇÃO!
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Deu certo! O usuário foi criado.
        const user = userCredential.user;
        console.log('Usuário criado com sucesso!', user.email);
        Alert.alert('Sucesso!', 'Usuário criado com sucesso!');
      })
      .catch((error) => {
        // Deu errado!
        console.error('Erro ao criar usuário:', error.message);
        Alert.alert('Erro!', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Teste de Cadastro</Text>
      
      {/* CAMPO DE E-MAIL */}
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail} // Atualiza o estado 'email'
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      {/* CAMPO DE SENHA */}
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={password}
        onChangeText={setPassword} // Atualiza o estado 'password'
        secureTextEntry // Esconde a senha
      />
      
      {/* BOTÃO DE CADASTRO */}
      <Button title="Cadastrar Novo Usuário" onPress={handleSignUp} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});