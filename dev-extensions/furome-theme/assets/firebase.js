import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



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
window.db = getFirestore(app);
// window.getDoc = getDoc;
// window.doc = doc;
async function getUserDocById(userId) {
  const docRef = doc(db, "users", userId);
  let docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
  } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
  }
}

getUserDocById("CAkCineFSmRZqsl9sXfem9mB2lk1");