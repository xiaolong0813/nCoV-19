<template>
    <div class="epidemic-map-all-trends epidemic-trends">
        <div
            ref="eChart" class="epidemic-trends-chart"
            :style="{
            width: '100%',
            height: `100%`
            }"
        >
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts/lib/echarts'
    import 'echarts/lib/chart/line'
    import 'echarts/lib/component/title'
    import 'echarts/lib/component/tooltip'

    export default {
        name: "EpidemicTrend",
        mounted() {
            this.setEchart()
        },
        data() {
            return {
                chart: {},
                chartHeight: 0
            }
        },
        props: {
            series: {
                type: Array,
                required: true,
                default: []
            }
        },
        // 也可以使用update，有数据改变时就调用changeEchart，这里只观察series参数
        watch: {
            series(newValue, oldValue) {
                this.changeEchart()
            }
        },
        computed: {
            dataSource() {
                // 如果不设置xAxis，应该 this.series.reverse().map(...) 取反
                return this.series.map(item => {
                    return [item.date, item.confirmedNum, item.deathsNum, item.curesNum]
                })
            },
            staticOpt() {
                return {
                    title: {
                        text: '最新疫情趋势图',
                        textStyle: {
                            fontSize: 14
                        }
                    },
                    legend: {
                        // show: true

                    },
                    grid: {
                        top: '20%',
                        left: '3%',
                        right: '0%',
                        bottom: '13%',
                        containLabel: true
                    },
                    tooltip: {},
                    xAxis: {
                        type: 'category',
                        inverse: true,     // 如果不设置这个，data数组应该取 reverse()
                        axisTick: {
                            // alignWithLabel: true,
                            show: false,
                            interval: 3
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#f0f0f0'
                            }
                        },
                        axisLabel: {
                            interval: 3,
                            rotate: 45,
                            margin: 8,
                            fontSize: 8.5,
                            color: '#999999',
                            showMinLabel: true,
                            showMaxLabel: true,
                            formatter: function (val, index) {
                                // var date = new Date(val)
                                // var text = [String(date.getUTCMonth() + 1).padStart(2, 0), String(date.getDate()).padStart(2, 0)]
                                // return text.join('.')
                                return val.split('-').slice(1).join('.')  // 和上面效果一样
                            }
                        }
                    },
                    yAxis: {
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#f0f0f0'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#f0f0f0'
                            }
                        },
                        axisLabel: {
                            fontSize: 11,
                            color: '#666666',
                            // showMinLabel: true,
                            // showMaxLabel: true,
                        }
                    },
                    series: [
                        {
                            name: '累积确诊',
                            type: 'line',
                            encode: {x: 0, y: 1}
                        },
                        {
                            name: '死亡',
                            type: 'line',
                            encode: {x: 0, y: 2}
                        },
                        {
                            name: '治愈',
                            type: 'line',
                            encode: {x: 0, y: 3}
                        }
                    ]
                }
            },
            dynamicOpt() {
                return {
                    dataset: {
                        source: this.dataSource
                    }
                }
            }
        },
        methods: {
            setEchart() {
                let dom = this.$refs.eChart
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

</style>
