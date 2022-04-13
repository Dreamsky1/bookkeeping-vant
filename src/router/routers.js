

export const routers = [
  {
    name: 'notFound',
    path: '/',
    redirect: {
      name: 'home'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../view/home/home')
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('../view/account/account')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../view/user/user')
  }
]
