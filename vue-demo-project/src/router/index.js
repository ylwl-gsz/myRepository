import Vue from 'vue'
import Router from 'vue-router'
import tableDemo from '@/components/tableDemo'
import showDemo from '@/components/showDemo'
import otherDemo from '@/components/otherDemo'
import home from '@/components/home/home'
import memberlist from '@/components/member/list'



Vue.use(Router)

export default new Router({
  // mode:history,
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/memberlist',
      name: 'memberlist',
      component: memberlist
    },
    {
      path: '/tableDemo',
      name: 'tableDemo',
      component: tableDemo
    },
    {
      path: '/showDemo',
      name: 'showDemo',
      component: showDemo
    },
    {
      path: '/otherDemo',
      name: 'otherDemo',
      component: otherDemo
    },

  ]
})
