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
                return this.series.reverse().map(item => {
                    return [item.date.split('-').slice(1).join('.'), item.confirmedNum, item.deathsNum, item.curesNum]
                })
            },
            opt() {
                let obj = {
                    title: {
                        text: '最新疫情趋势',
                        textStyle: {
                            fontSize: 14
                        }
                    },
                    tooltip: {},
                    xAxis: {
                        type: 'category'
                    },
                    yAxis: {},
                    dataset: {
                        source: this.dataSource
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
                return obj;
            }
        },
        methods: {
            setEchart() {
                let dom = this.$refs.eChart
                this.chart = echarts.init(dom)
                this.chart.setOption(this.opt)
            },
            changeEchart() {
                this.chart.setOption(this.opt)
            }
        },
    }
</script>

<style scoped lang="stylus">

</style>
