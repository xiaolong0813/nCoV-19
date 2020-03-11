<template>
  <div class="tab">
    <ul class="wrapper">
      <li
        v-for="(tab, index) of tabList"
        :class="index===activeIndex ? 'item item-active' : 'item'"
        :key="index"
        @click="handleClickTab(index)"
      >
        {{tab}}
      </li>
      <!-- 下划线 -->
      <div 
        class="tab-line"
        :class="{transform: `translated3d(${this.activeIndex * 100}%, 0, 0)`}"
      >
        <div class="tab-line-center"></div>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabList: ["上海疫情", "搜索指数", "疫情问答", "确诊小区", "最新进展", "个人防护", "加入我们"],
      activeIndex: 0
    }
  },
  methods: {
    handleClickTab(index) {
      this.activeIndex = index
      console.log(this.activeIndex)
    }
  }

}
</script>

<style scoped lang="stylus">
  .tab
    overflow-x scroll

  .tab::-webkit-scrollbar
    display none 

  .wrapper
    // background-color red
    height 44px
    line-height 44px
    text-align center
    font-size 16px
    min-width 540px
    display: flex
    flex-direction: columns 
    position relative

  .item
    flex: 1

  .item-active
    font-weight 800

  .tab-line
    width: 14.28571428%;
    height: 3px;
    position absolute
    bottom 0
    transition transform .3s ease-in-out

  .tab-line-center
    width 50%
    height 100%
    margin 0 auto
    background-color #f85959


</style>