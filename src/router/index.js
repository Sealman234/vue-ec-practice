import Vue from 'vue';
import VueRouter from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/pages/Login';
import Dashboard from '@/components/Dashboard';
import Products from '@/components/pages/Products';
import Coupons from '@/components/pages/Coupons';
import Orders from '@/components/pages/Orders';
import CustomerOrder from '@/components/pages/CustomerOrder';

Vue.use(VueRouter);

export default new VueRouter({
  linkActiveClass: 'active', // 觸發路徑
  routes: [{
      path: '*',
      redirect: 'login',
    },
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
        },
        {
          name: 'Coupons',
          path: 'coupons',
          component: Coupons,
          meta: {
            requiresAuth: true
          },
        },
        {
          name: 'Orders',
          path: 'orders',
          component: Orders,
          meta: {
            requiresAuth: true
          },
        },
      ],
    },
    {
      name: 'Dashboard',
      path: '/',
      component: Dashboard,
      children: [{
          name: 'CustomerOrder',
          path: 'customerOrder',
          component: CustomerOrder,
        },
      ],
    },
  ]
});
