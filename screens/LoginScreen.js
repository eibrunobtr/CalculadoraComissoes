import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable } from 'react-native'; // NOVO: Importa o Pressable

// 1. IMPORTAR AS FUNÇÕES DE LOGIN E RESET
import { auth } from '../firebaseConfig'; 
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'; // NOVO: Importa sendPasswordResetEmail

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha e-mail e senha.');
      return;
    }
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Usuário logado:', userCredential.user.email);
        navigation.navigate('Home'); 
      })
      .catch((error) => {
        Alert.alert('Erro no Login', error.message);
      });
  };

  // 2. NOVO: FUNÇÃO PARA REDEFINIR A SENHA
  const handlePasswordReset = () => {
    // Validação simples para ver se o e-mail foi preenchido
    if (!email) {
      Alert.alert('Erro', 'Por favor, digite seu e-mail no campo acima.');
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Sucesso!
        Alert.alert(
          'Verifique seu e-mail', 
          'Enviamos um link para redefinição de senha para ' + email
        );
      })
      .catch((error) => {
        // Erro!
        Alert.alert('Erro', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <Button title="Entrar" onPress={handleLogin} />

      {/* 3. NOVO: TEXTO CLICÁVEL PARA ESQUECI MINHA SENHA */}
      <Pressable onPress={handlePasswordReset} style={{ marginTop: 20 }}>
        <Text style={styles.forgotPasswordText}>
          Esqueci minha senha
        </Text>
      </Pressable>
      
      {/* (OPCIONAL - PODEMOS ADICIONAR DEPOIS)
        <Button 
          title="Não tem conta? Cadastre-se" 
          onPress={() => navigation.navigate('SignUp')}
        /> 
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
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
  // NOVO: Estilo para o texto de "Esqueci minha senha"
  forgotPasswordText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;