import { createRouter, createWebHistory } from "vue-router"
import MainLayout from "@/layouts/MainLayout"

const routes = [
	{
		path: "/",
		component: MainLayout,
		children: [
			{
				path: "",
				name: "PageMain",
				component: () => import("@/pages/PageMain"),
			},
		],
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
