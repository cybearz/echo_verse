<script setup lang="ts">

</script>

<template>
	<v-app-bar title="EchoVerse"/>

	<v-navigation-drawer permanent>
		<v-list>
			<v-list-item title="Navigation drawer"></v-list-item>
		</v-list>
	</v-navigation-drawer>
	<v-main>
		<v-container>
			<router-view/>
		</v-container>
	</v-main>
</template>
