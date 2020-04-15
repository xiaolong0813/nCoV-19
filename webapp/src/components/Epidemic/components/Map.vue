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
    // import 'echarts/lib/component/title'
    import 'echarts/lib/component/tooltip'

    export default {
        name: "EpidemicMap",
        data() {
            return {
                chart: {},
                curDistrict: {},
                // unchanged options for map chart
                staticOpt: {
                    title: {},
                    tooltip: {
                        trigger: 'item',
                        triggerOn: 'click',
                        //鼠标是否可进入提示框浮层中，默认为false.设置为true后可以点击，原理是设置了tip元素的 pointer-events 为auto（默认为none）
                        enterable: true,
                        formatter: (params, ticket, callback) => {
                            // console.log(this)
                            let data = params.data
                            // this.$nextTick(() => {
                            //     let dom = document.querySelector('.trace')
                            //     dom.addEventListener('click', function () {
                            //         console.log('trace')
                            //     }, true)
                            //
                            // })
                            // formatter 中定义的函数，跟Vue不在一个作用域下，也就是在vue中methods中写的方法，没法执行
                            // 所以不能用 @click 挂载
                            return `<div data-adcode="${data.id}">
                                        <div class="map-tooltip-content" >
                                            <p>${data.name}</p>
                                            <p>累计确诊：<span>${data.value}</span></p>
                                            <p>死亡：<span>${data.dead}</span></p>
                                            <p>治愈：<span>${data.cured}</span></p>
                                        </div>
                                        <hr/>
                                        <div class="trace"><p>确诊小区<i class="iconfont iconarrow-right"></i></p></div>
                                    </div>
                                    `
                        },
                        alwaysShowContent: true
                    },
                    series: [
                        {
                            type: 'map',
                            map: 'cityMap',
                            zoom:1.18,  // 放大一定倍数
                            label: {
                                show: true,
                                fontSize: 8
                            },
                            emphasis: {
                                label: {
                                    show: true
                                },
                                itemStyle: {
                                    areaColor: '#d5fefe',
                                }
                            }
                        }
                    ]
                },
                districtMapping: {},
                geoMapping: {}
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

            mappingData() {
                let data = []
                for (let id in this.geoMapping) {
                    data.push({
                        id: id,
                        name: this.geoMapping[id],
                        value: this.districtMapping[id].confirmed_count, // 用于地图展示
                        dead: this.districtMapping[id].death_count, // 用于填写 tooltip
                        cured: this.districtMapping[id].cured_count // 用于填写 tooltip
                    })
                }
                return data
            },
            dynamicOpt() {
                return {
                    series: [
                        {
                            data: this.mappingData
                        }
                    ]

                }
            }
        },
        watch: {
            geoData() {
                this.setEchart()
                // 更新 geo mapping 对象
                let mapping = {};
                this.geoData.features.map(item => {
                    mapping[String(item.id)] = item.properties.name
                })
                // 这里使用一个中间变量暂存新对象，再统一赋予 geoMapping，防止每循环一次就 compute
                this.geoMapping = mapping
            },
            districtDataList() {
                let mapping = {};
                this.districtDataList.map(item => {
                    if (item.local_id !== 0) {
                        mapping[String(item.local_id)]  = item
                    }
                })
                this.districtMapping = mapping
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
            // 初始情况下获取不到geo数据无法初始化地图，不能在这里 setEchart
        },
        methods: {
            // 当geo数据获得后，在执行
            setEchart() {
                let dom = this.$refs.eChart_map
                echarts.registerMap('cityMap', this.geoData)
                this.chart = echarts.init(dom)
                this.chart.setOption(this.staticOpt)
                // 事件代理的方式给 trace 元素绑定事件
                dom.addEventListener('click', event => {
                    let tar = event.target
                    if (tar.className === 'trace') {
                        this.handleTraceClick(tar.parentElement.dataset.adcode)
                    }
                })
            },
            // dynamicOpt 同时监视 geo 和 district 数据，只要两者有变化，就执行changeEchart
            changeEchart() {
                console.log(this.dynamicOpt)
                this.chart.setOption(this.dynamicOpt)
            },
            handleTraceClick(code) {
                console.log('click dom, ad code: ', code)
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
