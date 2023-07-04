<script setup lang="ts">
import { useCollection } from "@/composables/useCollection"
import dayjs from "dayjs"
import { computed, onUpdated, ref } from "vue"
import { useAuth } from "@/composables/useAuth"
import { serverTimestamp } from "firebase/firestore"
import AppMessage from "@/components/AppMessage"
import FormMessageSend from "@/components/FormMessageSend"

const { error, documents, addDoc } = useCollection("messages")
const documentsSorted = computed(() => documents.value.sort((a, b) => new Date(a.createdAt.toDate()) - new Date(b.createdAt.toDate())))
const documentsSortedAndFormatted = computed(() =>
	documentsSorted.value.map((doc) => ({
		...doc,
		createdAt: dayjs(doc.createdAt.toDate()).format("HH:mm"),
	})),
)

const { user } = useAuth()

function sendMsg(msg) {
	const sendMsgObj = {
		name: user.value.displayName,
		message: msg,
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
			<AppMessage
				v-for="doc in documentsSortedAndFormatted"
				:key="doc.id"
				:author="doc.name"
				:createdAt="doc.createdAt"
				:message="doc.message"
				class="mb-4"
			/>
		</div>
		<FormMessageSend
			@send="sendMsg"
		/>
	</div>
</template>
