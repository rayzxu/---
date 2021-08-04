import router from './router' // asyncRouterMap  动态路由
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { Message } from 'element-ui'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 取出某一子应用第一个显示页面
function getFirstPath(child) {  // 递归出第一个path
  if (!child.noDisplay && !child.hidden) {
    let path = child.path
    if (child.children && child.children.length) {
      path = getFirstPath(child.children[0])
    }
    return path
  }
}

const setTitle = ({appName, title}) => {
  document.title = `${appName || '第四周作业'}${title?`-${title}`:''}`
}
router.beforeEach((to, from, next) => {
  
  // 更换document.title
  setTitle(to.meta)
  NProgress.start() // start progress bar
    // determine if there has token
    /* has token*/
    if (store.getters.roles.length === 0) {
      // 判断当前用户是否已拉取完user_info信息
      store
        .dispatch('getUserInfo')
        .then(res => {
          // 拉取user_info
          const { menu } = res
          // 注入子应用
          store.dispatch('generateSubApp', menu).then(() => {
            // 左侧动态路由
            const subAppPrefix = sessionStorage.getItem('subAppPrefix', true)
            let appMenus, index, redirect
            const subApp = store.getters.subApp
            if (subAppPrefix) {
              index = subApp.findIndex(item => item.appPrefix === subAppPrefix)
              appMenus = subApp[index].appMenus
            } else {
              // 排除 登录页跳过来的 携带参数情况
              // 登录页过来 携带 redirect参数
              if (from.path === '/portal-login' && from.query.redirect) {
                redirect = '/' + from.query.redirect.split('/')[1]
                index = subApp.findIndex(item => item.appPrefix === redirect)
                if (index === -1) { // 如果 redirect 不属于子应用 路由体系的话
                  redirect = subApp[0].appPrefix
                  appMenus = subApp[0].appMenus
                } else {
                  appMenus = subApp[index].appMenus
                }
              } else {  // 登录页过来 不携带 redirect参数 默认取第一项
                index = -1
                redirect = subApp[0].appPrefix
                appMenus = subApp[0].appMenus
              }
              sessionStorage.setItem('subAppPrefix', redirect, true)
            }
            store.dispatch('generateRoutes', appMenus).then(() => {
              // 根据menu id生成可访问的路由表
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
              store.dispatch('setShowTrue')  // 解决 登录时 动态路由未加载情况 
              // 改变跳转地址 防止首次登录跳转 / 和 /portal-404 页面
              if (index === -1) {
                let path, appMenus = subApp[0].appMenus
                for (let i = 0; i < appMenus.length; i ++) {
                  path = getFirstPath(appMenus[i])
                  if (path) break
                }
                next({ path, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
              } else {
                next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
              }
            })
          })
        })
        .catch(err => {
          store.dispatch('fedLogOut').then(() => {
            Message.error({
              message: err || '验证错误， 请重新登录',
              duration: 3000,
              onClose: () => {
                next({ path: '/' })
              }
            })
          })
        })
    } else {
      // 查看是否点击链接跳转无权限页面
      // 因为微服务原因 并无此路由 需调第一个子路由的第一个页面
      if (to.path === '/') {
        const { appPrefix, appMenus } = store.getters.subApp[0]
        sessionStorage.setItem('subAppPrefix', appPrefix, true)
        sessionStorage.setItem('refreshApp', appPrefix, true)
        // 更换 左侧菜单
        store.dispatch('generateRoutes', appMenus).then(() => {
          // 根据menu id生成可访问的路由表
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          store.dispatch('setShowTrue')  // 解决 登录时 动态路由未加载情况 
          let path
          for (let i = 0; i < appMenus.length; i ++) {
            path = getFirstPath(appMenus[i])
            if (path) break
          }
          // 点击 logo跳转首页的拦截
          if (path === from.path) {
            NProgress.done()
            return
          }
          next({ path, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        })
      } else {
        next()
      }
    }
  }
)

router.afterEach(() => {
  NProgress.done() // finish progress bar
})