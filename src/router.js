// import Vue from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import CoachesDetails from '@/pages/coaches/CoachesDetails';
import CoachesList from '@/pages/coaches/CoachesList';
import CoachesRegister from '@/pages/coaches/CoachesRegister';
import NotFound from '@/pages/NotFound';
import ContactCoaches from '@/pages/requests/ContactCoaches';
import RequestReceived from '@/pages/requests/RequestReceived';

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
    { path: '/register', component: CoachesRegister },
    { path: '/requests', component: RequestReceived },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});
export default router;
