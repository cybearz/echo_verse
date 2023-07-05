<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useSignup } from "@/composables/useSignup"
import { ruleAlphanumeric, ruleCorrectEmail, ruleMinMax, ruleRequired, ruleStrongPassword } from "@/util/rules"

const displayName = ref("")
const displayNameRules = [
	ruleRequired,
	ruleAlphanumeric,
	ruleMinMax(2, 10),
]

const email = ref("")
const emailRules = [
	ruleRequired,
	ruleCorrectEmail,
]

const password = ref("")
const passwordRules = [
	ruleRequired,
	ruleStrongPassword,
]

const rePassword = ref("")
const rePasswordRules = [
	ruleRequired,
	v => v === password.value || "Пароли не совпадают"
]

const isValid = ref(false)
const router = useRouter()
const { loading, error, signup } = useSignup()

const onSubmit = async () => {
	if (!isValid.value) return //^

	await signup(email.value, password.value, displayName.value)
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
			<v-card-title>Регистрация</v-card-title>
			<v-card-text>
				<v-form
					v-model="isValid"
					validate-on="lazy blur"
					@submit.prevent="onSubmit"
				>
					<v-text-field
						v-model="displayName"
						:rules="displayNameRules"
						label="Имя"
						variant="underlined"
						class="mb-2"
					/>

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

					<v-text-field
						v-model="rePassword"
						:rules="rePasswordRules"
						type="password"
						label="Подтвердите"
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
