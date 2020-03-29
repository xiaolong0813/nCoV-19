import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Epidemic from '@/components/Epidemic/Epidemic'
import Community from '@/components/Community/Community'
import News from '@/components/News/News'
import QnA from '@/components/QnA/QnA'
import Safeguard from '@/components/Safeguard/Safeguard'
import SearchIndex from '@/components/SearchIndex/SearchIndex'
import Join from '@/components/Join/Join'

Vue.use(Router)

// vue-router 3 以后push改为返回Promise，捕捉到相同路径时应该需要catch该
// 错误。或者写成下面形式。这样push为void类型
// push(
//   location: RawLocation,
//   onComplete?: Function,
//   onAbort?: ErrorHandler
// ): void

// const originPush = Router.prototype.push
// Router.prototype.push = function push(loc) {
//   return originPush.call(this, loc).catch(err => {
//     console.log('路径错误 ', err)
//   })
// }

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/local'
    },
    {
      path: '/local',
      name: 'Epidemic',
      component: Epidemic
    },
    {
      path: '/index',
      name: 'SearchIndex',
      component: SearchIndex
    },
    {
      path: '/qna',
      name: 'QnA',
      component: QnA
    },
    {
      path: '/community',
      name: 'Community',
      component: Community
    },
    {
      path: '/news',
      name: 'News',
      component: News
    },
    {
      path: '/safeguard',
      name: 'Safeguard',
      component: Safeguard
    },
    {
      path: '/join',
      name: 'Join',
      component: Join
    }
  ]
})
