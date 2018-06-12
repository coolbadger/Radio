import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview';
import Cookies from 'js-cookie';
import {routers} from './router'

Vue.use(Router)

// 路由配置
const RouterConfig = {
  mode: 'history',
  routes: routers,
};

// 仅限未登录用户使用的页面
const UnloginOnlyList = ['login', 'register',]

export const router = new Router(RouterConfig);

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  if (to.meta.title) {  //路由元信息中指定页面Title时，修改Title
    document.title = to.meta.title
  }

  if (Cookies.get('user')) {  //当用户已经登录
    if (UnloginOnlyList.includes(to.name)) {
      next({
        name: 'home'
      });
    }
    else
      next();

  }
  else {  //当用户未登录
    if (!UnloginOnlyList.includes(to.name)) {
      next({
        name: 'login'
      });
    }
    else
      next();
  }

})

router.afterEach((to) => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});


export default router;
