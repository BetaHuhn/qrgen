import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/Home'),
		meta: {
			checkPath: false,
			scrollToTop: true
		}
	},
	{
		path: '/privacy',
		name: 'Privacy',
		component: () => import('@/views/Privacy'),
		meta: { scrollToTop: true }
	},
	{
		path: '/inprint',
		name: 'Inprint',
		component: () => import('@/views/Inprint'),
		meta: { scrollToTop: true }
	},
	{
		path: '*',
		name: 'Home',
		component: () => import('@/views/Home.vue'),
		meta: {
			checkPath: true,
			scrollToTop: true
		}
	}
]

const scrollBehavior = (to, from, savedPosition) => {
	if (savedPosition) {
		return savedPosition
	} else {
		const position = {}
		if (to.hash) {
			position.selector = to.hash
			if (to.hash === '#anchor2') {
				position.offset = { y: 100 }
			}
		}
		if (to.matched.some((m) => m.meta.scrollToTop)) {
			position.x = 0
			position.y = 0
		}
		return position
	}
}

const router = new VueRouter({
	mode: 'history',
	routes: routes,
	scrollBehavior
})

export default router