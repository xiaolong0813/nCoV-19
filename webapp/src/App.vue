<template>
  <div id="app">
    <home-tab :tabList="tabList"></home-tab>
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
    <loading></loading>
  </div>
</template>

<script>
import HomeTab from './components/Tab/Tab'
import Loading from '@/common/Loading/Loading'
export default {
  name: 'App',
  components: {
    HomeTab,
    Loading
  },
  data() {
    return {
      tabList: [
        {item: "上海疫情", link: "/shanghai"},
        {item: "搜索指数", link: "/index"},
        {item: "疫情问答", link: "/qna"},
        {item: "确诊小区", link: "/community"},
        {item: "最新进展", link: "/news"},
        {item: "个人防护", link: "/safeguard"},
        {item: "加入我们", link: "/join"},
      ]
    }
  },
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; */
  /* margin-top: 60px; */

  max-width: 640px;
  margin: 0 auto;
  /* display: flex;
  flex-direction: column;
  position: relative; */
}
</style>
