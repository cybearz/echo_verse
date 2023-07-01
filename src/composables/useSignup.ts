import { ref } from "vue"
import { auth } from "@/firebase/config"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"

const error = ref(null)

async function signup(email, password, displayName) {
	error.value = null

	try {
		const { user } = await createUserWithEmailAndPassword(auth, email, password)
		await updateProfile(user, { displayName })
	} catch (e) {
		error.value = e.message
	}
}

export function useSignup() {
	return {
		error,
		signup,
	}
}
