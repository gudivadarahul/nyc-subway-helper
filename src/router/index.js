import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../components/MainLayout.vue';
import Home from '../views/Home.vue';
import Learn from '../views/Learn.vue';
import Practice from '../views/Practice.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: Home },
      { path: 'learn', component: Learn },
      { path: 'practice', component: Practice },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
