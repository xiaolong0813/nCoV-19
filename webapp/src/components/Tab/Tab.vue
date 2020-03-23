<template>
  <div class="tab">
    <ul class="wrapper">
      <li
        v-for="(tab, index) of tabList"
        :class="index===activeIndex ? 'item item-active' : 'item'"
        :key="index"
        @click="handleClickTab(index, tab.link)"
      >
        {{tab.item}}
      </li>
      <!-- 下划线 -->
      <!--
        style使用{属性: 值}的方式进行css定义，而class使用style名称方式
        这里的:style后面的值可以用computed属性进行代替，即
        computed:
       -->
      <div
        class="tab-line"
        :style="{transform: `translate3d(${this.activeIndex * 100}%, 0, 0)`}"
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
      activeIndex: 0
    }
  },
  props: {
    tabList: {
      type: Array,
      required: true,
      default: []
    },
  },
  methods: {
    handleClickTab(index, link) {
      this.activeIndex = index
      // console.log(this.$router.param)
      this.$router.push(link, () => {}, err => {console.log(err)})
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
    min-width: 540px;
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
    width 46%
    height 100%
    margin 0 auto
    background-color #f85959


</style>
