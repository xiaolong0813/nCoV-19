<template>
    <div class="district">
        <div class="district-title">
            <p class="p1">XX区县分布</p>
            <p class="p2">依据卫健委数据按日更新，非实时数据</p>
        </div>
        <div class="district-map">
            <div class="district-map-content" style="position: relative">
                <!--正常文档流中和设置浮动的情况下，相对于父元素content-box的宽度；
                   绝对定位时，相对于包含块padding-box的宽度，所以这里父元素设置relative，
                   子元素也就是chart设置absolute，才能使chart100%大小
                   -->
                <div ref="eChart_map"
                     style="
                     width: 100%; height: 100%;
                     position: absolute; top: 0; bottom: 0; left: 0; right: 0;
                     "
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
                chart: {},
                curDistrict: {},
                staticOpt: {
                    title: {},
                    tooltip: {
                        trigger: 'item',
                        triggerOn: 'click',
                        formatter: '{b}<br/>{c} (p / km2)',
                        alwaysShowContent: true
                    },
                    series: [
                        {
                            type: 'map',
                            map: 'cityMap',
                            label: {
                                show: true,
                                fontSize: 8
                            },
                            data: [
                                {name: '崇明区', value: 123},
                                {name: '浦东新区', value: 234},
                                {name: '徐汇区', value: 555},
                            ]
                        }
                    ]
                },
                mapDataObj: {}
            }
        },
        props: {
            geoData: {
                type: Object,
                required: true,
                default: {}
            },
            districtDataList: {
                type: Array,
                required: true
            }
        },
        computed: {
            // geoDataDistrictList() {
            //     // 对象的解构赋值，相同属性名可以直接赋值
            //     const { geoData, districtDataList } = this
            //     return {
            //         geoData,
            //         districtDataList
            //     }
            // },

            dynamicOpt() {
                return {
                    series: [
                        {
                            data: [
                                {name: '黄浦区', value: 20057.34},
                                {name: '浦东新区', value: 15477.48},
                                {name: '徐汇区', value: 31686.1},
                            ]
                        }
                    ]

                }
            }
        },
        watch: {
            geoData() {
                this.setEchart()
            },
            districtDataList() {
                for (let item of this.districtDataList) {
                    let locId = item.local_id
                    if (locId !== 0) {
                        this.mapDataObj.locId = item
                        if (this.curDistrict.confirmed_count < item.confirmed_count) {
                            this.curDistrict = item
                        }
                    }
                }
                console.log(this.curDistrict)
                this.changeEchart()
            },
            // 这里是 watch 中的 WatchOptionsWithHandler 类型数据
            // 同时监视 geo数据和 district分布数据，当两种都有数据时进行赋值
            // geoDataDistrictList: {
            //     handler: (newval , oldval) => {
            //         console.log('old value is: ', oldval)   // {geoData: {…}, districtDataList: Array(0)}
            //         console.log('new value is: ', newval)   // {geoData: {…}, districtDataList: Array(18)}
            //         const { geoData, districtDataList } = newval
            //         if (geoData.features.length && districtDataList.length) {
            //
            //         }
            //     },
            //     deep: true
            // }
        },
        mounted() {
            //  下面打印结果： {__ob__: Observer} [__ob__: Observer]
            // console.log('initial value is: ', this.geoData, this.districtDataList)
            // this.setEchart()
            // console.log(this.$refs.eChart_map)
            // 初始情况下获取不到geo数据无法初始化地图，不能放在这里
        },
        methods: {
            setEchart() {
                let dom = this.$refs.eChart_map
                echarts.registerMap('cityMap', this.geoData)
                this.chart = echarts.init(dom)

                this.chart.setOption(this.staticOpt)
            },
            changeEchart() {
                this.chart.setOption(this.dynamicOpt)
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
