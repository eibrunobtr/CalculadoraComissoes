import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa as telas de Autenticação
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

// IMPORTANTE: Agora importamos o Navegador de Abas em vez da HomeScreen
import MainTabNavigator from './MainTabNavigator';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      {/* Telas de Autenticação (Sem abas) */}
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }}
      />
      
      <Stack.Screen 
        name="SignUp" 
        component={SignUpScreen} 
        options={{ headerShown: false }}
      />
      
      {/* Tela Principal (COM ABAS) */}
      {/* Quando fizermos navigation.navigate('Home'), ele vai carregar as abas */}
      <Stack.Screen 
        name="Home" 
        component={MainTabNavigator} 
        options={{ headerShown: false }} // Esconde o cabeçalho duplo
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;