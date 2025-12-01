import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Biblioteca de ícones padrão do Expo

// Importa suas 3 telas novas
import VendasScreen from '../screens/VendasScreen';
import PedidosScreen from '../screens/PedidosScreen';
import RelatoriosScreen from '../screens/RelatoriosScreen';

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Configuração dos ícones
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Vendas') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Pedidos') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Relatório') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue', // Cor do ícone ativo
        tabBarInactiveTintColor: 'gray', // Cor do ícone inativo
      })}
    >
      <Tab.Screen name="Vendas" component={VendasScreen} />
      <Tab.Screen name="Pedidos" component={PedidosScreen} />
      <Tab.Screen name="Relatório" component={RelatoriosScreen} />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;