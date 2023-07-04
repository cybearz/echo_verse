<script setup lang="ts">
import { ref } from "vue"

interface IEmits {
	(e: "send", value: string): void,
}

const emit = defineEmits<IEmits>()

const message = ref("")

function send() {
	emit("send", message.value)
	message.value = ""
}
</script>

<template>
	<v-form @submit.prevent="send">
		<v-row align="center">
			<v-col>
				<v-textarea
					v-model="message"
					auto-grow
					hide-details
					rows="1"
					variant="outlined"
					clearable
					placeholder="Введите ваше сообщение"
				/>
			</v-col>
			<v-col cols="auto">
				<v-btn
					icon
					type="submit"
				>
					<v-icon>mdi-send</v-icon>
				</v-btn>
			</v-col>
		</v-row>
	</v-form>
</template>
