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
        watch: {
            series(newValue, oldValue) {
                
            }
        },
        computed: {
            seriesDate() {
                return ["1衬衫","1羊毛衫","雪纺衫","裤子","高跟鞋","袜子"].map(item => {
                    return [item + 'ooo', item + 'nnn']
                })
            },
            dataSource() {
                return this.series.map(item => {
                    return [item.date, item.confirmedNum, item.deathsNum, item.curesNum]
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
                    test: this.seriesDate,
                    dataset: {
                        source: this.dataSource
                    },
                    series: [
                        {
                            name: '销量',
                            type: 'line',
                            encode: {x: 0, y: 1}
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
            // changeEchart() {
            //     this.chart.setOption(this.opt)
            // }
        },
    }
</script>

<style scoped lang="stylus">

</style>
