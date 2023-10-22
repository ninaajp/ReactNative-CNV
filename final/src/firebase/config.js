//vinculo de nuestra aplicacion con firebase

import app from 'firebase/app'
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDXTddMWSvHKoI5esTzb31a6BLBRD9-6jU",
  authDomain: "final-rn-de7d1.firebaseapp.com",
  projectId: "final-rn-de7d1",
  storageBucket: "final-rn-de7d1.appspot.com",
  messagingSenderId: "385376878193",
  appId: "1:385376878193:web:088e52dd2da528848865d0"
};

//initializeApp: metodo de firebase
//cada vez que se manden solicitudes a traves de los metodos de firebase, estara vinculado y ya sabra a que cluster le debe pegar
//cluster: grupos de servidores que se gestionan juntos y participan en la gestión de carga de trabajo
app.initializeApp(firebaseConfig)

//constantes que se usaran a lo largo del proyecto
export const auth = firebase.auth()
export const storage = app.storage()

//db es con la que nos vamos a conectar a la base de datos
export const db = app.firestore()