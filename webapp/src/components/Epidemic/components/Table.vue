<template>
    <div class="block-container">
        <div class="table-wrapper">
            <div class="table-container">
                <div class="table-head">
                    <p class="th-1"><span>区县</span></p>
                    <p class="th-2"><span>新增</span></p>
                    <p class="th-3"><span>累计</span></p>
                    <p class="th-4"><span>死亡</span></p>
                    <p class="th-5"><span>治愈</span></p>
                    <p class="th-6"><span>详情</span></p>
                </div>
                <div class="table-content">
                    <div class="table-item border-bottom"
                         v-for="(item, index) in showList"
                         :key="index"
                    >
                        <p class="p1">{{item.name}}</p>
                        <p class="p2"><span>{{item.confirmed_incr > 0 ? item.confirmed_incr : ''}}</span></p>
                        <p class="p3"><span>{{item.confirmed_count > 0 ? item.confirmed_count : ''}}</span></p>
                        <p class="p4"><span>{{item.death_count > 0 ? item.death_count : ''}}</span></p>
                        <p class="p5"><span>{{item.cured_count > 0 ? item.cured_count : ''}}</span></p>
                        <p class="p6">

                        </p>
                    </div>
                </div>
            </div>
            <p class="table-show-more"
               @click="handleShowMore"
            >
                <span>{{showMoreText}}</span>
                <i class="iconfont icon-down" v-html="showMoreIcon">
                    {{showMoreIcon}}
                </i>
            </p>
        </div>
        <div class="card-show-anchor"></div>
    </div>
</template>

<script>
    export default {
        name: "EpidemicTable",
        data() {
            return {
                showMore: false
            }
        },
        computed: {
            showMoreText() {
                return this.showMore ? '点击收起' : '点击查看更多'
            },
            showMoreIcon() {
                return this.showMore ? `&#xe744;` : `&#xe7b2;`
            },
            showList() {
                return this.showMore ? this.list : this.list.slice(0,3)
            }
        },
        props: {
            list: {
                type: Array,
                required: true
            },
        },
        methods: {
            handleShowMore() {
                this.showMore = !this.showMore
            }
        },
    }
</script>

<style scoped lang="stylus">
    @import "~styles/global.styl"
    @import "~styles/mixins.styl"
    .table-container
        margin 0 .32rem
        border-radius .04rem
        padding-bottom .32rem
        .table-head
            display flex
            font-size .24rem
            align-items center
            text-align center
            height .64rem
            line-height .64rem
            span
                position relative
                top .02rem
            p[class^="th-"]
                width 52px
            .th-1
                flex 1
                padding-left .4rem
                text-align left
                color $locColor
                border-radius .04rem 0 0 0
                background-color $locBC
            .th-2
                color $newColor
                background-color $newBC
            .th-3
                color $confirmAllColor
                background-color $confirmAllBC
            .th-4
                color $deadColor
                background-color $deadBC
            .th-5
                color $curedColor
                background-color $curedBC
            .th-6
                color $detColor
                background-color  $detBC


        .table-item
            display flex
            font-size .26rem
            color $cellColor
            text-align center
            font-weight bold

            // 子元素中从第二个开始
            p:nth-child(n+2)
                width 52px
                font-family 'ByteNumber-Bold'
                margin-top .26rem
                margin-bottom .2rem
                display flex
                align-items center
                justify-content center
            .p1
                flex 1
                margin-top .26rem
                margin-bottom .2rem
                font-size .28rem
                text-align left
                padding-left .4rem
                ellipsis()
            .p2
                color $newColor




    .table-show-more
        padding-bottom .32rem
        font-size .28rem
        color $cellColor
        display flex
        justify-content center
        align-items center
        .icon-down
            width .36rem
            height .36rem
            transform scale(1.2)
            position relative
            top 0.02rem
</style>
