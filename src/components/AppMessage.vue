<script setup lang="ts">
interface IProps {
	author: String,
	createdAt: String,
	message: String,
}

defineProps<IProps>()

</script>

<template>
	<div>
		<div class="d-flex align-center mb-2">
			<v-avatar
				size="32"
			>
				<v-img
					src="https://cdn.vuetifyjs.com/images/john.jpg"
					alt="John"
				/>
			</v-avatar>
			<div class="ml-2 text-subtitle-1">{{ author }}</div>
			<div class="ml-2 text-caption">{{ createdAt }}</div>
		</div>
		<v-card
			color="grey-lighten-3"
			elevation="0"
		>
			<v-card-text class="text-pre-wrap">
				{{ message }}
			</v-card-text>
		</v-card>
	</div>
</template>
