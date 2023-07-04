<script setup lang="ts">
import { useCollection } from "@/composables/useCollection"
import dayjs from "dayjs"
import { computed, ref } from "vue"
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
</script>

<template>
	<div class="h-100 d-flex flex-column">
		<v-list class="overflow-y-auto h-100">
			<v-list-item
				v-for="doc in documentsSortedAndFormatted"
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
	</div>
</template>
