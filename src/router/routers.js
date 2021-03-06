export const routers = [
  {
    path: '/',
    redirect: {
      name: 'detail'
    }
  },
  {
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
  },
  {
    path: '/bill_detail',
    name: 'bill_detail',
    component: () => import('../view/bill/billDetail'),
    meta: { title: '账单详情', isAuth: true }
  },
  {
    path: '/bill',
    name: 'bill',
    component: () => import('../view/bill/bill'),
    meta: { title: '新增账单', isAuth: true }
  },
  {
    path: '/suggest',
    name: 'suggest',
    component: () => import('@/view/user/suggest'),
    meta: { title: '反馈与建议', isAuth: true }
  },
  {
    path: '/category',
    name: 'category',
    component: () => import('@/view/bill/category'),
    meta: { title: '分类管理', isAuth: true }
  }
]
