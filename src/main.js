import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';


// 要用到 Bootstrap 的 jQuery 功能時才需要載入，如果只是用到樣式就不需要
// 因為 Vue Cli 已經設定好了，所以只需要輸入 import 'bootstrap' 直接載入就能運作了
import 'bootstrap';
// 因為 Bootstrap 必須仰賴 jQuery 與 popper 才能運行
// npm install --save jquery popper.js


import App from './App';
import router from './router';

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

axios.defaults.withCredentials = true;

new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>',
  router,
})

router.beforeEach((to, from, next) => {
  console.log('to', to);
  console.log('from', from);
  console.log('next', next);
  if (to.meta.requiresAuth) {
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then(response => {
      console.log(response.data);
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login',
        })
      }
    });
  } else {
    next();
  }
})
