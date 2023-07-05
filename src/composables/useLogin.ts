import { ref } from "vue"
import { auth } from "@/firebase/config"
import { signInWithEmailAndPassword } from "firebase/auth"

const loading = ref(false)
const error = ref<null | string>(null)

async function login(email, password) {
	loading.value = true
	error.value = null

	try {
		await signInWithEmailAndPassword(auth, email, password)
		loading.value = false
	} catch (e) {
		error.value = e.message
		loading.value = false
	}
}

export function useLogin() {
	return {
		loading,
		error,
		login,
	}
}
