import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'el-icon-s-home' }
    }]
  },

  {
    path: '/banner',
    component: Layout,
    redirect: '/banner/list',
    name: '应用管理',
    meta: { title: '应用管理', icon: 'el-icon-s-help'},
    children: [
      {
        path: 'list',
        name: '轮播图列表',
        component: () => import('@/views/banner/list'),
        meta: { title: '轮播图列表', icon: 'el-icon-notebook-2'}
      },
      {
        path: 'save',
        name: '添加轮播图',
        component: () => import('@/views/banner/save'),
        meta: { title: '轮播图新增', icon: 'el-icon-document-add' }
      },
      {
        path: 'edit/:bannerId',
        name: '修该轮播图',
        hidden: true,
        component: () => import('@/views/banner/edit'),
        meta: { title: '轮播图修该', icon: 'el-icon-edit-outline' }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: '用户管理',
    meta: { title: '用户管理', icon: 'el-icon-user-solid'},
    children: [
      {
        path: 'list',
        name: '用户列表',
        component: () => import('@/views/user/list'),
        meta: { title: '用户列表', icon: 'el-icon-notebook-2'}
      },
      {
        path: 'save',
        name: '添加用户',
        component: () => import('@/views/user/save'),
        meta: { title: '用户新增', icon: 'el-icon-document-add' }
      },
      {
        path: 'edit/:userId',
        name: '用户修改',
        hidden: true,
        component: () => import('@/views/user/edit'),
        meta: { title: '用户修改', icon: 'el-icon-edit-outline' }
      }
    ]
  },

  {
    path: '/type',
    component: Layout,
    redirect: '/type/list',
    name: '类型管理',
    meta: { title: '类型管理', icon: 'el-icon-s-order'},
    children: [
      {
        path: 'list',
        name: '类型列表',
        component: () => import('@/views/type/list'),
        meta: { title: '类型列表', icon: 'el-icon-notebook-2'}
      },
      {
        path: 'save',
        name: '添加类型',
        component: () => import('@/views/type/save'),
        meta: { title: '类型新增', icon: 'el-icon-document-add' }
      },
      {
        path: 'edit/:typeId',
        name: '类型修改',
        hidden: true,
        component: () => import('@/views/type/edit'),
        meta: { title: '类型修改', icon: 'el-icon-edit-outline' }
      }
    ]
  },

  {
    path: '/scenicSpot',
    component: Layout,
    redirect: '/scenicSpot/auditedList',
    name: '景点管理',
    meta: { title: '景点管理', icon: 'el-icon-s-ticket'},
    children: [
      {
        path: 'auditedList',
        name: '已审核列表',
        component: () => import('@/views/scenicSpot/auditedList'),
        meta: { title: '已审核列表', icon: 'el-icon-notebook-2'}
      },
      {
        path: 'toBeAuditedList',
        name: '待审核列表',
        component: () => import('@/views/scenicSpot/toBeAuditedList'),
        meta: { title: '待审核列表', icon: 'el-icon-document' }
      },
      {
        path: 'audit/:scenicSpotId',
        name: '景点审核',
        hidden: true,
        component: () => import('@/views/scenicSpot/audit'),
        meta: { title: '景点审核', icon: 'form' }
      }
    ]
  },

  {
    path: '/posts',
    component: Layout,
    redirect: '/posts/auditedList',
    name: '微话管理',
    meta: { title: '微话管理', icon: 'el-icon-s-finance'},
    children: [
      {
        path: 'auditedList',
        name: '已审核列表',
        component: () => import('@/views/posts/auditedList'),
        meta: { title: '已审核列表', icon: 'el-icon-notebook-2'}
      },
      {
        path: 'toBeAuditedList',
        name: '待审核列表',
        component: () => import('@/views/posts/toBeAuditedList'),
        meta: { title: '待审核列表', icon: 'el-icon-document' }
      },
      {
        path: 'audit/:postsId',
        name: '微话审核',
        hidden: true,
        component: () => import('@/views/posts/audit'),
        meta: { title: '微话审核', icon: 'form' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
