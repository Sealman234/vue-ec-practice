import Vue from 'vue';
import VueRouter from 'vue-router';

// import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/pages/login';
import Dashboard from '@/components/Dashboard';
import Products from '@/components/pages/Products';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [{
      path: '*',
      redirect: 'login',
    },
    // {
    //   name: 'HelloWorld',
    //   path: '/',
    //   component: HelloWorld,
    //   meta: {
    //     requiresAuth: true
    //   },
    // },
    {
      name: 'Login',
      path: '/login',
      component: Login,
    },
    {
      name: 'Dashboard',
      path: '/admin',
      component: Dashboard,
      children: [{
        name: 'Products',
        path: 'products',
        component: Products,
        meta: {
          requiresAuth: true
        },
      }],
    },
  ]
});
