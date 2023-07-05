import { ref } from "vue"
import { auth } from "@/firebase/config"
import { signOut } from "firebase/auth"

const loading = ref(false)
const error = ref<null | string>(null)

async function logout() {
	loading.value = true
	error.value = null

	try {
		await signOut(auth)
		loading.value = false
	} catch (e) {
		error.value = e.message
		loading.value = false
	}
}

export function useLogout() {
	return {
		loading,
		error,
		logout,
	}
}
