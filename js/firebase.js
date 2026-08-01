import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDzT6WqXBse-a1g2Fue9zvtNXHBRrFII-U",
  authDomain: "kilat-06.firebaseapp.com",
  projectId: "kilat-06",
  storageBucket: "kilat-06.firebasestorage.app",
  messagingSenderId: "789021855786",
  appId: "1:789021855786:web:4a6f2d54ccf08f52327353"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);