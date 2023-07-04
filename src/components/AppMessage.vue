<script setup lang="ts">
interface IProps {
	author: string,
	createdAt: string,
	message: string,
	isMine: boolean,
}

defineProps<IProps>()

</script>

<template>
	<div
		class="d-flex flex-column"
		:class="{ 'align-end': isMine }"
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
			<div class="mx-2 text-subtitle-1">{{ author }}</div>
			<div class="text-caption">{{ createdAt }}</div>
		</div>
		<v-card
			:color="isMine ? 'blue-lighten-3' : 'grey-lighten-3'"
			elevation="0"
			class="message"
		>
			<v-card-text class="text-pre-wrap">
				{{ message }}
			</v-card-text>
		</v-card>
	</div>
</template>

<style scoped>
.message {
	display: inline-block;
	min-width: 15%;
	max-width: 65%;
}
</style>
