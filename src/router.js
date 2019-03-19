import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/screen',
      name: 'screen',
      component: resolve => require(['./views/screen/screen.vue'], resolve),
      children: [
        {
          path: '',
          name: 'home',
          component: resolve => require(['./views/screen/home.vue'], resolve),
        },
        {
          path: 'realtime',
          name: 'realtime',
          component: resolve => require(['./views/screen/realtime.vue'], resolve)
        }
      ]
    },
    {
      path: '/mobile',
      name: 'mobile',
      component: resolve => require(['./views/mobile/meeting.vue'], resolve)
    },
    {
      path: '/mobile/meeting',
      name: 'mobile',
      component: resolve => require(['./views/mobile/meeting.vue'], resolve)
    }
  ]
})
