import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyADomHZJDb65a3KXOZUl4Cc2dtNb-fp17o",
  authDomain: "stewardship-hub-a214e.firebaseapp.com",
  projectId: "stewardship-hub-a214e",
  storageBucket: "stewardship-hub-a214e.appspot.com",
  messagingSenderId: "141018488161",
  appId: "1:141018488161:web:e7faa611c9befafa0c7920"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
