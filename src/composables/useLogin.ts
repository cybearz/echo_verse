import { ref } from "vue"
import { auth } from "@/firebase/config"
import { signInWithEmailAndPassword } from "firebase/auth"

const error = ref(null)

async function login(email, password) {
	error.value = null
	try {
		await signInWithEmailAndPassword(auth, email, password)
	} catch (e) {
		error.value = e.message
	}
}

export function useLogin() {
	return {
		error,
		login,
	}
}
