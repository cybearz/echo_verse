import { auth } from "@/firebase/config"
import { useAuth as fbUseAuth } from "@vueuse/firebase"

const { isAuthenticated, user } = fbUseAuth(auth)

export function useAuth() {
	return {
		isAuthenticated,
		user,
	}
}
