<script setup lang="ts">

import { ref } from "vue"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")

const router = useRouter()
const onSubmit = () => {
	console.log("Submit: ", email.value, password.value)
	router.push({ name: "PageMain" })
}
</script>

<template>
	<v-container>
		<v-card class="mx-auto px-6 py-8" max-width="344">
			<v-card-title>Регистрация</v-card-title>
			<v-card-text>
				<v-form @submit.prevent="onSubmit">
					<v-text-field
						v-model="email"
						label="Email"
						variant="underlined"
						class="mb-2"
					/>

					<v-text-field
						v-model="password"
						label="Пароль"
						variant="underlined"
						class="mb-2"
					/>

					<v-btn
						block
						color="primary"
						type="submit"
						variant="elevated"
					>
						Регистрация
					</v-btn>
				</v-form>
				<p class="mt-2">
					Есть аккаунт?
					<v-btn
						:to="{ name: 'PageLogin' }"
						class="text-none pa-0"
						variant="plain"
					>
						Войти
					</v-btn>
				</p>
			</v-card-text>
		</v-card>
	</v-container>
</template>
