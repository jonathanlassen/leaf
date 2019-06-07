import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Claim from './views/Claim.vue'
import Update from './views/Update.vue'

Vue.use(Router)

const router = new Router({

  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/claim',
      name: 'claim',
      component: Claim, props: true
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/update',
      name: 'update',
      component: Update
    },
    {
      path: '/shop/:id',
      name: 'shop',
      component: Home,
    },


    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },

    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const privatePages = [];
  const authRequired = privatePages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
});

export default router;
