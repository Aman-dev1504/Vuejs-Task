import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import Main from '../views/Main.vue';
import Profile from '../views/Profile.vue';
import store from '../store/store';
const routes = [
  { path: '/', component: LandingPage },
  { path: '/main', component: Main ,meta: { requiresAuth: true }},
  { path: '/profile', component: Profile ,meta: { requiresAuth: true }},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const isAuthenticated =store.getters.isLoggedIn;
  console.log(isAuthenticated)
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    router.push('/');
  } else {
    next(); 
  }
});
export default router;
