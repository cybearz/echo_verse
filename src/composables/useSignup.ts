import { ref } from "vue"
import { auth } from "@/firebase/config"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"

const loading = ref(false)
const error = ref<null | string>(null)

async function signup(email, password, displayName) {
	loading.value = true
	error.value = null

	try {
		const { user } = await createUserWithEmailAndPassword(auth, email, password)
		await updateProfile(user, { displayName })
		loading.value = false
	} catch (e) {
		error.value = e.message
		loading.value = false
	}
}

export function useSignup() {
	return {
		loading,
		error,
		signup,
	}
}
