import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable } from 'react-native';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

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

  const handlePasswordReset = () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, digite seu e-mail no campo acima.');
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert('Verifique seu e-mail', 'Link de redefinição enviado para ' + email);
      })
      .catch((error) => {
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
      
      <View style={{ marginBottom: 20 }}>
        <Button title="Entrar" onPress={handleLogin} />
      </View>

      <Pressable onPress={handlePasswordReset}>
        <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
      </Pressable>

      {/* BOTÃO DE CADASTRO ATIVO */}
      <View style={{ marginTop: 30, width: '100%' }}>
        <Button 
          title="Não tem conta? Cadastre-se" 
          onPress={() => navigation.navigate('SignUp')}
          color="green"
        />
      </View>
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
  forgotPasswordText: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
});

export default LoginScreen;