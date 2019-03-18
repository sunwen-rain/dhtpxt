import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/screen',
      name: 'screen',
      component: () => import('./views/screen/screen.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('./views/screen/home.vue')
        },
        {
          path: 'realtime',
          name: 'realtime',
          component: () => import('./views/screen/realtime.vue')
        }
      ]
    },
    {
      path: '/mobile',
      name: 'mobile',
      component: () => import('./views/mobile/meeting.vue')
    },
    {
      path: '/mobile/meeting',
      name: 'mobile',
      component: () => import('./views/mobile/meeting.vue')
    }
  ]
})
