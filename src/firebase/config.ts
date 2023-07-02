import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore, addDoc } from "firebase/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyAwBX7NoH46sYqhhjqePgCZvNaoE6Rt9wE",
	authDomain: "echo-verse.firebaseapp.com",
	projectId: "echo-verse",
	storageBucket: "echo-verse.appspot.com",
	messagingSenderId: "609593986796",
	appId: "1:609593986796:web:d16dfab16aa3c319c6dfc9",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, db }
