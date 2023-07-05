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
		:class="{ 'justify-end': isMine}"
		class="d-flex mb-2"
	>
		<v-avatar v-if="!isMine">
			<v-img
				src="https://cdn.vuetifyjs.com/images/john.jpg"
				alt="John"
			/>
		</v-avatar>
		<v-card
			:color="isMine ? 'blue-lighten-4' : 'grey-lighten-5'"
			class="ml-2 pa-3"
			style="max-width: 65%"
		>
			<div class="d-flex align-center">
				<span class="font-weight-medium">{{ isMine ? "Вы" : author }}</span>
				<span class="ml-2 text-medium-emphasis text-caption">{{ createdAt }}</span>
			</div>
			<p class="text-high-emphasis">
				{{ message }}
			</p>
		</v-card>
	</div>
</template>
