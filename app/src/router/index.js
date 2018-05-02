import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Root',
      component: () => import('@/views/Main')
    },
    {
      path: '/:deviceId',
      name: 'Device',
      props: (route) => ({deviceId: route.params.deviceId}),
      component: () => import('@/views/Meter')
    }
  ]
})
