<template>
  <div id="app">
    <tab :tabList="tabList"></tab>
    <!-- <img src="./assets/logo.png"> -->
      <div class="content">
          <keep-alive>
              <router-view/>
          </keep-alive>
      </div>
<!--    <loading></loading>-->
  </div>
</template>

<script>
import Tab from './components/Tab/Tab'
import Loading from '@/common/Loading/Loading'
export default {
  name: 'App',
  components: {
    Tab,
    Loading
  },
  data() {
    return {
      tabList: [
        {item: '上海疫情', link: "/shanghai"},
        {item: "搜索指数", link: "/index"},
        {item: "疫情问答", link: '/qna'},
        {item: "确诊小区", link: "/community"},
        {item: "最新进展", link: "/news"},
        {item: "个人防护", link: "/safeguard"},
        {item: "加入我们", link: "/join"},
      ]
    }
  },
}
</script>

<style scoped lang="stylus">
    #app
        webkit-font-smoothing: antialiased
        height 100%
        max-width 640px
        margin 0 auto
        display flex
        flex-direction column
        position relative

        font-size .32rem
        color #222222

        &::-webkit-scrollbar
            display none


    .content
        overflow-x hidden
        overflow-y auto

        &::-webkit-scrollbar
            display none
        /*flex: 1 1;*/
        /*background-color: red;*/


</style>
