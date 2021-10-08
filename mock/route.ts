export default {
  '/api/auth_routes': {
    '/form/advanced-form': { authority: ['admin', 'user'] },
  },
  '/api/routes': {
    code: '00000',
    message: '成功',
    data: [
      {
        code: 'dashboard',
        name: 'dashboard',
        route: '/dashboard',
        key: '/dashboard',
        path: '/dashboard',
        icon: 'icon-dashboard',
        menuType: 0,
        children: [
          {
            code: 'analysis',
            name: 'analysis',
            route: '/dashboard/analysis',
            path: '/dashboard/analysis',
            key: '/dashboard/analysis',
            renderType: 0,
            menuType: 1,
            component: 'dashboard/Analysis',
          },
          {
            code: 'monitor',
            name: 'monitor',
            route: '/dashboard/monitor',
            path: '/dashboard/monitor',
            key: '/dashboard/monitor',
            renderType: 0,
            menuType: 1,
            component: 'dashboard/Monitor',
          },
          {
            code: 'workplace',
            name: 'workplace',
            route: '/dashboard/workplace',
            path: '/dashboard/workplace',
            key: '/dashboard/workplace',
            renderType: 1,
            menuType: 1,
            targetUrl: 'https://www.163.com/',
          },
        ],
      },
      {
        code: 'account',
        name: 'account',
        route: '/account',
        key: '/account',
        path: '/account',
        icon: 'icon-setting',
        menuType: 0,
        children: [
          {
            code: 'center',
            name: 'center',
            route: '/account/center',
            path: '/account/center',
            key: '/account/center',
            renderType: 0,
            menuType: 1,
            component: 'account/Center',
          },
          {
            code: 'settings',
            name: 'settings',
            route: '/account/settings',
            path: '/account/settings',
            key: '/account/settings',
            renderType: 0,
            menuType: 1,
            component: 'account/Settings',
          },
        ],
      },
    ]
  },
};
