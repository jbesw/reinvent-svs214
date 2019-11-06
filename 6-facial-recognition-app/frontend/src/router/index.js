import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Enroll from '@/components/Enroll'
import Verify from '@/components/Verify'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'home',
      component: Main
    },
    {
      path: '/verify',
      name: 'verify',
      component: Verify
    },
    {
      path: '/enroll',
      name: 'enroll',
      component: Enroll
    }
  ]
})
