import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  Button, 
  Image, 
  TextInput, 
  ScrollView,
  Platform, // Para permissões
  TouchableOpacity // *** NOVO IMPORT para botões customizados ***
} from 'react-native';

// Navegação
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Ícones (Opcional, mas fica melhor)
// Para instalar: npx expo install @expo/vector-icons
import { Ionicons } from '@expo/vector-icons'; 

// Biblioteca para Câmera e Galeria
import * as ImagePicker from 'expo-image-picker';

// *** NOVO IMPORT *** (Menu Dropdown)
import { Picker } from '@react-native-picker/picker';

// Firebase (Onde os dados serão salvos)
// Você precisa configurar isso no site do Firebase
// import { initializeApp } from 'firebase/app';
// *** IMPORTS DO FIRESTORE ATUALIZADOS ***
// import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";
// import { getStorage, ref, uploadBytes } from "firebase/storage";

// --- INÍCIO: Configuração do Firebase (Substitua pelo seu) ---
// 1. Crie um projeto em console.firebase.google.com
// 2. Vá em "Configurações do projeto" e "Adicionar app" > "Web"
// 3. Copie o objeto firebaseConfig e cole aqui
const firebaseConfig = {
  apiKey: "SEU_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};

// Inicializa o Firebase (DESCOMENTE QUANDO TIVER SEU CONFIG)
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const storage = getStorage(app);
// --- FIM: Configuração do Firebase ---


// --- INÍCIO: REGRAS DE NEGÓCIO (ATUALIZADO COM LISTA MANUAL) ---
// (Valores por UNIDADE)
const PRODUCT_RULES = {
  'RENO 14 🦈': { pontos: 5, comissao: 120 },
  'RENO 14F 🪼': { pontos: 5, comissao: 80 },
  'RENO 13 🐦‍🔥': { pontos: 5, comissao: 100 },
  'RENO13F 🦋': { pontos: 5, comissao: 50 },
  'A5 Pro 🪽': { pontos: 3, comissao: 40 },
  'A5 5G🏹': { pontos: 3, comissao: 25 },
  'A5 4G 🔥': { pontos: 1, comissao: 10 },
  'A79 💜': { pontos: 1, comissao: 40 },
  'A60 💙': { pontos: 1, comissao: 20 },
  'A58 💚': { pontos: 1, comissao: 10 },
  'A40 ❤': { pontos: 1, comissao: 10 },
};

// Lista de produtos para o Picker (atualiza automaticamente)
const productList = Object.keys(PRODUCT_RULES);
// --- FIM: REGRAS DE NEGÓCIO ---


// --- TELA 1: Início (Boas-vindas) ---
function HomeScreen({ navigation }) { // Adiciona 'navigation' para podermos navegar
  return (
    <SafeAreaView style={styles.container}>
      {/* Vamos usar ScrollView para garantir que cabe em telas menores */}
      <ScrollView contentContainerStyle={styles.content}>
        
        <Ionicons name="business-outline" size={60} color="#007BFF" />
        <Text style={styles.title}>Bem-vindo, Vendedor!</Text>
        <Text style={styles.subtitle}>O que você gostaria de fazer?</Text>

        {/* Cartões de Acesso Rápido */}
        <TouchableOpacity 
          style={styles.homeCard} 
          onPress={() => navigation.navigate('Lançamentos')}
        >
          <Ionicons name="calculator-outline" size={32} color="#fff" />
          <Text style={styles.homeCardText}>Novo Lançamento</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.homeCard} 
          onPress={() => navigation.navigate('Uploads')}
        >
          <Ionicons name="camera-outline" size={32} color="#fff" />
          <Text style={styles.homeCardText}>Enviar Foto</Text>
        </TouchableOpacity>

        {/* Um card de sumário (exemplo) */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Resumo do Mês (Simulado)</Text>
          <Text style={styles.summaryText}>Pontos Atuais: 11</Text>
          <Text style={styles.summaryText}>Comissão: R$ 250.00</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// --- TELA 2: Lançamentos (Entrada de Dados do Excel) ---
function DataEntryScreen() {
  // Estados atualizados
  const [produtoSelecionado, setProdutoSelecionado] = useState(productList[0]);
  const [quantidade, setQuantidade] = useState('1');
  const [status, setStatus] = useState('');

  // Lógica para salvar os dados no Firestore
  const handleSaveData = async () => {
    const qtdNum = parseInt(quantidade, 10);

    if (!produtoSelecionado || !qtdNum || qtdNum <= 0) {
      setStatus('Erro: Selecione um produto e insira uma quantidade válida.');
      return;
    }
    
    setStatus('Salvando...');
    try {
      // Pega as regras para o produto
      const rules = PRODUCT_RULES[produtoSelecionado];
      if (!rules) {
        throw new Error('Regra não encontrada para o produto.');
      }
      
      // Calcula pontos e comissão para este lançamento
      const pontosCalculados = rules.pontos * qtdNum;
      const comissaoCalculada = rules.comissao * qtdNum;

      // **LÓGICA DO FIREBASE (Descomente quando o Firebase estiver pronto)**
      // const docRef = await addDoc(collection(db, "lancamentos"), {
      //   produto: produtoSelecionado,
      //   quantidade: qtdNum,
      //   pontosCalculados: pontosCalculados,
      //   comissaoCalculada: comissaoCalculada,
      //   data: new Date(),
      //   // userId: "ID_DO_USUARIO_LOGADO" // Importante para multi-usuário
      // });
      // setStatus(`Salvo com sucesso! (ID: ${docRef.id})`);

      // Placeholder (simulação)
      console.log('Dados Salvos (Simulação):', { 
        produto: produtoSelecionado, 
        quantidade: qtdNum,
        pontos: pontosCalculados,
        comissao: comissaoCalculada
      });
      setStatus('Salvo com sucesso! (Simulação)');
      setQuantidade('1'); // Reseta a quantidade

    } catch (e) {
      console.error("Erro ao salvar: ", e);
      setStatus('Erro ao salvar no banco de dados.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Novo Lançamento</Text>
        <Text style={styles.subtitle}>Selecione o produto vendido e a quantidade.</Text>
        
        <Text style={styles.inputLabel}>Produto:</Text>
        {/* O Picker (Dropdown) para selecionar o produto */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={produtoSelecionado}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              setProdutoSelecionado(itemValue)
            }>
            {productList.map((produto) => (
              <Picker.Item key={produto} label={produto} value={produto} />
            ))}
          </Picker>
        </View>

        <Text style={styles.inputLabel}>Quantidade:</Text>
        <TextInput
          style={styles.input}
          placeholder="1"
          keyboardType="numeric"
          value={quantidade}
          onChangeText={setQuantidade}
        />
        
        <Button title="Salvar Lançamento" onPress={handleSaveData} />
        {status && <Text style={styles.statusText}>{status}</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}

// --- TELA 3: Upload de Fotos ---
function UploadScreen() {
  const [imageUri, setImageUri] = useState(null);
  const [status, setStatus] = useState('');

  // Pedir permissão (necessário para iOS)
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (cameraStatus.status !== 'granted' || galleryStatus.status !== 'granted') {
          // Não usar alert, mas sim um Text no state
          setStatus('Precisamos de permissão da câmera e galeria para funcionar!');
        }
      }
    })();
  }, []);

  // Lógica para abrir a galeria
  const pickImage = async () => {
    setStatus('');
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5, // Qualidade reduzida para upload mais rápido
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Lógica para abrir a câmera
  const takePhoto = async () => {
    setStatus('');
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };
  
  // Lógica para enviar a foto para o Firebase Storage
  const handleUpload = async () => {
    if (!imageUri) {
      setStatus('Selecione uma imagem primeiro.');
      return;
    }
    
    setStatus('Enviando...');
    try {
      // Converte a imagem (uri) para um blob (arquivo binário)
      const response = await fetch(imageUri);
      const blob = await response.blob();
      
      const filename = imageUri.split('/').pop();
      // **LÓGICA DO FIREBASE STORAGE (Descomente quando o Firebase estiver pronto)**
      // const storageRef = ref(storage, `uploads/${filename}`);
      // await uploadBytes(storageRef, blob);
      
      // setStatus('Upload concluído com sucesso!');

      // Placeholder (simulação)
      console.log('Upload Feito (Simulação):', filename);
      setStatus('Upload concluído! (Simulação)');
      setImageUri(null);

    } catch (e) {
      console.error('Erro no upload: ', e);
      setStatus('Erro ao enviar a imagem.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Upload de Fotos</Text>
        
        <View style={styles.buttonContainer}>
          <Button title="Escolher da Galeria" onPress={pickImage} />
          <Button title="Tirar Foto" onPress={takePhoto} />
        </View>
        
        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
        )}
        
        <Button title="Salvar Foto na Nuvem" onPress={handleUpload} disabled={!imageUri} />
        {status && <Text style={styles.statusText}>{status}</Text>}
      </View>
    </SafeAreaView>
  );
}

// --- TELA 4: Relatório (Cálculos) ---
function ReportScreen({ navigation }) { // Adiciona 'navigation'
  // Estados atualizados
  const [totalComissao, setTotalComissao] = useState(0);
  const [totalPontos, setTotalPontos] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Lógica para calcular
  const calcularResultados = async () => {
    setIsLoading(true);
    
    // **LÓGICA DOS CÁLCULOS (Baseada no Firestore)**
    
    let comissaoAcumulada = 0;
    let pontosAcumulados = 0;

    try {
      // 1. Buscar dados do Firestore
      // (Aqui você pode adicionar filtros de data, ex: where("data", ">=", dataInicioMes))
      
      // *** LÓGICA DO FIREBASE (Descomente quando estiver pronto) ***
      // const q = query(collection(db, "lancamentos")); // Adicionar filtros 'where' aqui
      // const querySnapshot = await getDocs(q);

      // // 2. Iterar e somar
      // querySnapshot.forEach((doc) => {
      //   const data = doc.data();
      //   comissaoAcumulada += data.comissaoCalculada || 0;
      //   pontosAcumulados += data.pontosCalculados || 0;
      // });
      
      // setTotalComissao(comissaoAcumulada);
      // setTotalPontos(pontosAcumulados);

      // Simulação (Placeholder):
      console.log('Simulando busca no DB...');
      setTimeout(() => {
        // Valores de simulação (ex: 2 RENO 14 e 1 A5 4G)
        setTotalComissao( (120*2) + 10 ); // 250
        setTotalPontos( (5*2) + 1 ); // 11
      }, 500);


    } catch (e) {
      console.error("Erro ao buscar relatório: ", e);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Adiciona um 'listener' para recalcular quando a tela for focada
  // (Requer 'navigation' prop)
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Atualizando relatório...');
      calcularResultados();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Relatório Mensal</Text>
        <Button title="Atualizar Relatório" onPress={calcularResultados} disabled={isLoading} />
        
        {isLoading ? (
          <Text style={styles.subtitle}>Calculando...</Text>
        ) : (
          <View style={styles.reportBox}>
            {/* Título e Valor Atualizados */}
            <Text style={styles.reportLabel}>Comissão Total (Mês):</Text>
            <Text style={styles.reportValue}>R$ {totalComissao.toFixed(2)}</Text>
            
            <Text style={styles.reportLabel}>Pontuação Total (Mês):</Text>
            <Text style={styles.reportValue}>{totalPontos} pts</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}


// --- Navegador Principal (Abas) ---
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // Define os ícones das abas
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Início') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Lançamentos') {
              iconName = focused ? 'calculator' : 'calculator-outline';
            } else if (route.name === 'Uploads') {
              iconName = focused ? 'camera' : 'camera-outline';
            } else if (route.name === 'Relatório') {
              iconName = focused ? 'bar-chart' : 'bar-chart-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007BFF',
          tabBarInactiveTintColor: 'gray',
          headerShown: false, // Esconde o cabeçalho padrão
        })}
      >
        <Tab.Screen name="Início" component={HomeScreen} />
        <Tab.Screen name="Lançamentos" component={DataEntryScreen} />
        <Tab.Screen name="Uploads" component={UploadScreen} />
        {/* Passamos 'navigation' para ReportScreen para o auto-refresh (ativado acima) */}
        <Tab.Screen name="Relatório" component={ReportScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Fundo cinza claro
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  // Estilos para UploadScreen
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  previewImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  statusText: {
    marginTop: 15,
    fontSize: 14,
    color: 'green',
  },
  // Estilos para DataEntryScreen
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    width: '100%',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  // Estilos NOVOS para o Picker
  pickerContainer: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  // Estilos para ReportScreen
  reportBox: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reportLabel: {
    fontSize: 18,
    color: '#555',
  },
  reportValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 15,
  },
  
  // --- NOVOS ESTILOS PARA HOME SCREEN ---
  homeCard: {
    backgroundColor: '#007BFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  homeCardText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  summaryCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    marginTop: 10,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
});

