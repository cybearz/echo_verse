<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useLogin } from "@/composables/useLogin"
import { ruleCorrectEmail, ruleRequired } from "@/util/rules"

const email = ref("")
const emailRules = [
	ruleRequired,
	ruleCorrectEmail,
]

const password = ref("")
const passwordRules = [
	ruleRequired,
]

const isValid = ref(false)
const router = useRouter()
const { loading, error, login } = useLogin()

const onSubmit = async () => {
	if (!isValid.value) return //^

	await login(email.value, password.value)
	if (error.value) {
		console.log(error.value)
	} else {
		await router.push({ name: "PageMain" })
	}
}
</script>

<template>
	<v-container>
		<v-card class="mx-auto px-6 py-8" max-width="344">
			<v-card-title>Вход</v-card-title>
			<v-card-text>
				<v-form
					v-model="isValid"
					validate-on="lazy blur"
					@submit.prevent="onSubmit"
				>
					<v-text-field
						v-model="email"
						:rules="emailRules"
						label="Email"
						variant="underlined"
						class="mb-2"
					/>

					<v-text-field
						v-model="password"
						:rules="passwordRules"
						type="password"
						label="Пароль"
						variant="underlined"
						class="mb-2"
					/>

					<v-btn
						:loading="loading"
						block
						color="primary"
						type="submit"
						variant="elevated"
					>
						Войти
					</v-btn>
				</v-form>
				<p class="mt-2">
					Нет аккаунта?
					<v-btn
						:to="{ name: 'PageSignup' }"
						class="text-none pa-0"
						variant="plain"
					>
						Создать
					</v-btn>
				</p>
			</v-card-text>
		</v-card>
	</v-container>
</template>
