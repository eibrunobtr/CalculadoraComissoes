import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa as telas que vamos criar
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator(); // Cria a "pilha"

function AppNavigator() {
  return (
    <Stack.Navigator>
      {/* Define a tela de Login como a primeira tela */}
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} // Esconde o cabeçalho "Login"
      />
      
      {/* Define a tela Home */}
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;