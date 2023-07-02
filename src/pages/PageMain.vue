<script setup lang="ts">
import { useCollection } from "@/composables/useCollection"
import dayjs from "dayjs"
import { computed, ref } from "vue"
import { useAuth } from "@/composables/useAuth"
import { serverTimestamp } from "firebase/firestore"

const message = ref()
const { error, documents, addDoc } = useCollection("messages")
const documentsSorted = computed(() => documents.value.sort((a, b) => new Date(a.createdAt.toDate()) - new Date(b.createdAt.toDate())))
const documentsFormatted= computed(() =>
	documentsSorted.value.map((doc) => ({
		...doc,
		createdAt: dayjs(doc.createdAt.toDate()).format('HH:mm')
	}))
)

const { user } = useAuth()

function sendMsg() {
	const sendMsgObj = {
		name: user.value.displayName,
		message: message.value,
		createdAt: serverTimestamp(),
	}
	console.log("Error:", documentsFormatted.value)
	// console.log("sendMsg: ", sendMsgObj)
	addDoc(sendMsgObj)

}
</script>

<template>
	<v-row justify="center" class="h-100">
		<v-col cols="10" class="d-flex flex-column">
			<div class="flex-grow-1">
				<v-list>
					<v-list-item
						v-for="doc in documentsFormatted"
						:key="doc.id"
						:title="doc.name"
						:subtitle="doc.message"
						prepend-avatar="https://randomuser.me/api/portraits/men/83.jpg"
					>
						<template v-slot:append>
							<span>{{ doc.createdAt }}</span>
						</template>
					</v-list-item>
				</v-list>
			</div>
			<v-form>
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
							@click="sendMsg"
						>
							<v-icon>mdi-send</v-icon>
						</v-btn>
					</v-col>
				</v-row>
			</v-form>
		</v-col>
	</v-row>
</template>
