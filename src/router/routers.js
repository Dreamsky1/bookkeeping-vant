

export const routers = [
  {
    path: '/',
    name: '首页',
    component: () => import('../components/HelloWorld')
    // component: () => import('../components/HelloWorld') 懒加载
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../view/home/home')
  }
]
