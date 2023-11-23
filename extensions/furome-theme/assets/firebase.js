import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
// Required for side-effects
import { getFirestore, getDoc, doc, collection  } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCs1qpuiaIejPGNFk4xXAo3pkqD9H48cUg",
    authDomain: "lomis-report.firebaseapp.com",
    projectId: "lomis-report",
    storageBucket: "lomis-report.appspot.com",
    messagingSenderId: "407256956986",
    appId: "1:407256956986:web:85d56dcb5536ca5b993503",
    measurementId: "G-75GRHZW3D6"
};

const app = initializeApp(firebaseConfig);
getFirestore(app);
console.log("collection", collection)

window.db = getFirestore(app);
window.app = app;
window.doc = doc;
window.getDoc = getDoc;
window.collection  = collection ;
