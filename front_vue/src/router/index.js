import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import authGuard from './auth-guard'
import adminGuard from './admin-guard'
import NProgress from 'nprogress'
import store from '../store'
import multiguard from 'vue-router-multiguard'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'Home',
    // beforeEnter: authGuard,
    component: () => import('../layouts/Public.vue'),
    children: [
      {
        path: '',
        // redirect: '/constructor',
        components: {
          guest: () => import('../views/About.vue')
        }
      },
      {
        path: 'news',
        components: {
          guest: () => import('../views/news/IndexGuest.vue')
        }
      },
      {
        path: 'news/:id',
        name: 'SingleNews',
        props: {
          guest: true
        },
        components: {
          guest: () => import('../views/news/Single.vue')
        }
      }
    ]
    // component: Home
  },
  {
    path: '/lk',
    name: 'LK',
    redirect: '/lk/home',
    beforeEnter: authGuard,
    component: () => import('../layouts/Dashboard.vue'),
    children: [
      {
        path: 'home',
        beforeEnter: authGuard,
        component: () => import('../views/Home.vue')
      },
      {
        path: 'chat',
        component: () => import('../views/chat/Index.vue')
      },
      {
        path: 'albums-images',
        beforeEnter: multiguard([authGuard, adminGuard]),
        component: () => import('../views/albumImage/IndexAdmin.vue')
      },
      {
        path: 'album/create',
        beforeEnter: multiguard([authGuard, adminGuard]),
        component: () => import('../views/album/Create.vue')
      },
      {
        path: 'album/:id',
        props: true,
        beforeEnter: multiguard([authGuard, adminGuard]),
        component: () => import('../views/album/Edit.vue')
      },
      {
        path: 'albums',
        beforeEnter: multiguard([authGuard, adminGuard]),
        component: () => import('../views/album/IndexAdmin.vue')
      },
      {
        path: 'news',
        beforeEnter: multiguard([authGuard, adminGuard]),
        component: () => import('../views/news/IndexAdmin.vue')
      },
      {
        path: 'news/create',
        name: 'NewsCreate',
        beforeEnter: multiguard([authGuard, adminGuard]),
        component: () => import('../views/news/Create.vue')
      },
      {
        path: 'news/:id',
        name: 'NewsEdit',
        props: true,
        beforeEnter: multiguard([authGuard, adminGuard]),
        component: () => import('../views/news/Edit.vue')
      }
    ]
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/auth/Register.vue')
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: () => import('../views/auth/ResetPassword1.vue')
  },
  {
    path: '/reset/:code',
    name: 'Reset',
    props: true,
    component: () => import('../views/auth/ResetPassword2.vue')
  },
  {
    path: '/verify/:code',
    name: 'Verify',
    props: true,
    component: () => import('../views/auth/RegisterConfirm.vue')
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeResolve((to, from, next) => {
  if (
    (to.path === '/login' ||
      to.path === '/register' ||
      to.path === '/forgot') &&
    store.getters.isAuth == true
  ) {
    return
  }

  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start()
  }
  next()
})

// eslint-disable-next-line
router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router
