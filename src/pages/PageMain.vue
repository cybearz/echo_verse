<script setup lang="ts">
import { useCollection } from "@/composables/useCollection"
import dayjs from "dayjs"
import { computed, onUpdated, ref } from "vue"
import { useAuth } from "@/composables/useAuth"
import { serverTimestamp } from "firebase/firestore"

const message = ref()
const { error, documents, addDoc } = useCollection("messages")
const documentsSorted = computed(() => documents.value.sort((a, b) => new Date(a.createdAt.toDate()) - new Date(b.createdAt.toDate())))
const documentsSortedAndFormatted = computed(() =>
	documentsSorted.value.map((doc) => ({
		...doc,
		createdAt: dayjs(doc.createdAt.toDate()).format("HH:mm"),
	})),
)

const { user } = useAuth()

function sendMsg() {
	const sendMsgObj = {
		name: user.value.displayName,
		message: message.value,
		createdAt: serverTimestamp(),
	}
	addDoc(sendMsgObj)
}

const messageArea = ref<null | HTMLElement>(null)
onUpdated(() => {
	if (!messageArea.value) return //^
	messageArea.value.scrollTop = messageArea.value.scrollHeight
})
</script>

<template>
	<div class="h-100 d-flex flex-column">
		<div
			ref="messageArea"
			class="overflow-y-auto h-100 pr-1"
		>
			<div
				v-for="doc in documentsSortedAndFormatted"
				:key="doc.id"
				class="mb-4"
			>
				<div class="d-flex align-center mb-2">
					<v-avatar
						size="32"
					>
						<v-img
							src="https://cdn.vuetifyjs.com/images/john.jpg"
							alt="John"
						/>
					</v-avatar>
					<div class="ml-2 text-subtitle-1">{{ doc.name }}</div>
					<div class="ml-2 text-caption">{{ doc.createdAt }}</div>
				</div>
				<v-card
					color="grey-lighten-3"
					elevation="0"
					:text="doc.message"
				/>
			</div>
		</div>
		<v-form @submit.prevent="sendMsg">
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
	</div>
</template>
