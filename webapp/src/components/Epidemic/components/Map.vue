<template>
    <div class="district">
        <div class="district-title">
            <p class="p1">XX区县分布</p>
            <p class="p2">依据卫健委数据按日更新，非实时数据</p>
        </div>
        <div class="district-map">
            <div class="district-map-content">
                <div ref="eChart_map"
                     style="width: 100%; height: 100%"
                >
                </div>
            </div>
            <div class="district-map-visual">
                <div class="visual-item">
                    <div
                        class="visual-item-rect cityVisualMap-1"
                        style="border: 0.5px solid #c2c6cc"

                    ></div>
                    <p class="visual-item-text">0</p>
                </div>
                <div
                    class="visual-item"
                    v-for="i of 5"
                    :key="i"
                >
                    <div :class="['visual-item-rect', 'cityVisualMap-' + (i + 1)]"></div>
                    <p class="visual-item-text">{{1 + 20 * (i - 1)}}-{{20 * i}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts/lib/echarts'
    import 'echarts/lib/chart/map'
    import 'echarts/lib/component/title'

    export default {
        name: "EpidemicMap",
        data() {
            return {
                chart: {}
            }
        },
        props: {
            geoData: {
                type: Object,
                required: true,
                default: {}
            },
        },
        computed: {
            staticOpt() {
                return {
                    series: [
                        {
                            type: 'map',

                        }
                    ]

                };
            },
            dynamicOpt() {
                return {

                }
            }
        },
        watch: {
            geoData() {
                console.log(this.geoData)
                this.changeEchart()
            }
        },
        mounted() {
            this.setEchart()
        },
        methods: {
            setEchart() {
                let dom = this.$refs.eChart_map
                this.chart = echarts.init(dom)
                this.chart.registerMap('normandy_info', this.geoData)

                this.chart.setOption(this.staticOpt)
            },
            changeEchart() {
                // this.chart.registerMap('normandy_info', this.geoData)
            }
        },

    }
</script>

<style scoped lang="stylus">
    @import "~styles/global.styl"
    .district
        background-color #ffffff
        padding .16rem .4rem .24rem .4rem
        .district-title
            display flex
            font-size .24rem
            justify-content space-between
            line-height .36rem
            .p1
                font-weight bold
                font-size .28rem
                color #222222
            .p2
                color #999999
        .district-map
            display flex
            justify-content center
            align-items center
            flex-direction column
            .district-map-content
                width 100%
                height 0
                padding-bottom 100%
            .district-map-visual
                margin-top .08rem
                display flex
                flex-direction row
                justify-content center
                .visual-item
                    height .16rem
                    margin-right .16rem
                    color #222222
                    display flex
                    align-items center
                    .visual-item-rect
                        width .12rem
                        height .12rem
                        margin-right .04rem
                    .visual-item-text
                        height .16rem
                        line-height .16rem
                        font-size .16rem
                        color #505050


</style>
