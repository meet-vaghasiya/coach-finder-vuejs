// import Vue from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import CoachesDetails from '@/pages/coaches/CoachesDetails';
import CoachesList from '@/pages/coaches/CoachesList';
import CoachesRegister from '@/pages/coaches/CoachesRegister';
import NotFound from '@/pages/NotFound';
import ContactCoaches from '@/pages/requests/ContactCoaches';
import RequestReceived from '@/pages/requests/RequestReceived';
import UserAuth from '@/pages/auth/UserAuth';
import store from './store/index'


// Vue.use(VueRouter);
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' }, // if user enter / than we need to redirect to coaches pages
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      props: true, // this is pass id as a props in router
      component: CoachesDetails,
      children: [
        {
          path: 'contact', // this is children route, so we need to use <rotuer-view> into coach detail component
          component: ContactCoaches
        }
      ]
    },
    { path: '/register', component: CoachesRegister, meta:{requiresAuth:true} },
    { path: '/requests', component: RequestReceived ,meta:{requiresAuth:true}},
    { path: '/auth', component: UserAuth,meta:{requiresUnAuth:true} },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});
router.beforeEach(function(to, from, next)  {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth')
  } else if(to.meta.requiresUnAuth && store.getters.isAuthenticated){
    next('/coaches')
  } else {
    next()
  }

})

export default router;
