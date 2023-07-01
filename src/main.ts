import { createApp } from "vue"
import { auth } from "@/firebase/config"
import { registerPlugins } from "@/plugins"
import App from "./App.vue"

let app

auth.onAuthStateChanged(() => {
	if (app) return //^
	app = createApp(App)
	registerPlugins(app)
	app.mount("#app")
})
