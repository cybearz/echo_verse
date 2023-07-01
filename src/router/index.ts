import { createRouter, createWebHistory } from "vue-router"
import LayoutMain from "@/layouts/LayoutMain.vue"
import { useAuth } from "@/composables/useAuth"

const routes = [
	{
		path: "/",
		component: LayoutMain,
		meta: { authRequired: true },
		children: [
			{
				path: "",
				name: "PageMain",
				component: () => import("@/pages/PageMain"),
			},
		],
	},
	{
		path: "/auth",
		component: () => import("@/layouts/LayoutAuth"),
		meta: { authRequired: false },
		children: [
			{
				path: "",
				redirect: "/auth/login",
			},
			{
				path: "login",
				name: "PageLogin",
				component: () => import("@/pages/PageLogin"),
			},
			{
				path: "signup",
				name: "PageSignup",
				component: () => import("@/pages/PageSignup"),
			},
		],
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

const { isAuthenticated } = useAuth()
router.beforeEach((to) => {
	if (to.meta.authRequired && !isAuthenticated.value) {
		return { name: "PageLogin" }
	}
	return true
})

export default router
