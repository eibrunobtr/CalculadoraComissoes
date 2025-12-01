import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator'; // 1. Importa seu navegador

export default function App() {
  return (
    // 2. O app agora só se preocupa em carregar o container de navegação
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}