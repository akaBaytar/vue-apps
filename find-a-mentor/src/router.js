import { createRouter, createWebHistory } from 'vue-router';

// page components
import MentorDetail from './pages/mentors/MentorDetail.vue';
import MentorRegistration from './pages/mentors/MentorRegistration.vue';
import MentorsList from './pages/mentors/MentorsList.vue';

import ContactMentor from './pages/requests/ContactMentor.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';

import UserAuth from './pages/auth/UserAuth.vue';
import NotFound from './pages/NotFound.vue';

// vuex
import store from './data/store.js';

// router configuration
const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      redirect: '/mentors',
    },
    {
      path: '/mentors',
      component: MentorsList,
    },
    {
      path: '/mentors/:id',
      component: MentorDetail,
      props: true,
      children: [{ path: 'contact', component: ContactMentor }],
    },
    {
      path: '/register',
      component: MentorRegistration,
      meta: { requiresAuth: true },
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: { requiresAuth: true },
    },
    {
      path: '/auth',
      component: UserAuth,
      meta: { requiresUnauth: true },
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresunAuth && store.getters.isAuthenticated) {
    next('/mentors');
  } else {
    next();
  }
});

export default router;
