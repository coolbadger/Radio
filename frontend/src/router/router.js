export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login'
  },
  component: () => import('@/view/Login.vue')
};

export const homeRouter = {
  path: '/',
  name: 'home',
  meta: {
    title: 'Home'
  },
  component: () => import('@/view/Main.vue')
};

export const registerRouter = {
  path: '/register',
  name: 'register',
  meta: {
    title: 'Register'
  },
  component: () => import('@/view/Register.vue')
};


// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  loginRouter,
  homeRouter,
  registerRouter
];
