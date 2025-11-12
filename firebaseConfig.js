// 1. IMPORTA AS FUNÇÕES PRINCIPAIS
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 2. SUAS CHAVES (COPIEI DA SUA IMAGEM)
// (Não se preocupe, o measurementId do Analytics não atrapalha)
const firebaseConfig = {
  apiKey: "AIzaSyDo5IoqRgzfqdhY_-TfJDBveqEAhcHadg",
  authDomain: "oppoapp-a09c1.firebaseapp.com",
  projectId: "oppoapp-a09c1",
  storageBucket: "oppoapp-a09c1.firebasestorage.app",
  messagingSenderId: "505724668361",
  appId: "1:505724668361:web:c83b98c273e027c6508018",
  measurementId: "G-PQFM9KGFGC"
};

// 3. INICIALIZA O FIREBASE
const app = initializeApp(firebaseConfig);

// 4. EXPORTA OS SERVIÇOS QUE VAMOS USAR
// (É ISSO QUE IMPORTA)
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);