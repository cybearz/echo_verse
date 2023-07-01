import { ref } from "vue"
import { auth } from "@/firebase/config"
import { signOut } from "firebase/auth"

const error = ref(null)

async function logout() {
	error.value = null

	try {
		await signOut(auth)
	} catch (e) {
		error.value = e.message
	}
}

export function useLogout() {
	return {
		error,
		logout,
	}
}
