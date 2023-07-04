<script setup lang="ts">
import { useLogout } from "@/composables/useLogout"
import { useRouter } from "vue-router"
import { useAuth } from "@/composables/useAuth"

const { user, isAuthenticated } = useAuth()

const { logout, error } = useLogout()
const router = useRouter()

const handleLogout = async () => {
	await logout()
	if (error.value) {
		console.log(error.value)
	} else {
		router.push({ name: "PageLogin" })
	}
}
</script>

<template>
	<v-navigation-drawer permanent>
		<template v-if="isAuthenticated">
			<v-list>
				<v-list-item
					prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
					:title="user.displayName"
					:subtitle="user.email"
				/>
			</v-list>

			<v-divider/>

			<v-list density="compact" nav>
				<v-list-item
					prepend-icon="mdi-forum"
					title="Общий чат"
					value="chat"
				/>
				<v-list-item
					prepend-icon="mdi-logout"
					title="Выйти"
					value="logout"
					@click="handleLogout"
				/>
			</v-list>
		</template>
	</v-navigation-drawer>
	<v-app-bar title="EchoVerse"/>
	<v-main class="h-screen">
		<v-container class="h-100">
			<router-view/>
		</v-container>
	</v-main>
</template>
