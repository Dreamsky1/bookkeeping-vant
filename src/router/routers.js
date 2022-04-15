

export const routers = [
  {
    name: 'notFound',
    path: '/',
    redirect: {
      name: 'detail'
    }
  },
  {
    // 之后改成detail 明细页面
    path: '/detail',
    name: 'detail',
    component: () => import('../view/detail/detail'),
    meta: { title: '明细', isAuth: true }
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('../view/account/account'),
    meta: { title: '统计', isAuth: true }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../view/user/user'),
    meta: { title: '我的', isAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../view/login/login'),
    meta: { title: '登录', isAuth: false }
  }
]
