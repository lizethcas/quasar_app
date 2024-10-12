import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../layouts/NavBarLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue')
      }
    ],
    meta: {
      requireAuth: false
    }
  },

  {
    path: '/welcome', // Ruta para la página de inicio de sesión
    name: 'welcome',
    component: () => import('pages/WelcomePage.vue'),
    meta: {
      requireAuth: true
    }
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

// Configura el middleware de enrutamiento para verificar la autenticación antes de cada navegación

export default routes
