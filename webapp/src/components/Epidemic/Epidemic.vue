<template>
  <div>
      <epidemic-logo :city="this.curCity.name"></epidemic-logo>
      <div class="block-container">
          <epidemic-title></epidemic-title>
          <epidemic-total></epidemic-total>
          <epidemic-map></epidemic-map>
          <epidemic-table :list="districtList"></epidemic-table>
          <epidemic-trend :series="series"
                          v-if="series.length"
          ></epidemic-trend>
      </div>
  </div>
</template>

<script>
    import EpidemicLogo from "./components/Logo";
    import EpidemicTitle from "./components/Title";
    import EpidemicTotal from "./components/Total";
    import EpidemicMap from "./components/Map";
    import EpidemicTable from "./components/Table";
    import EpidemicTrend from "./components/Trend";
    // udf api
    import { getLocalNcov, getDistrictStat } from '@/api/local'
    // store
    import { mapState } from 'vuex'
export default {
    name: 'Epidemic',
    components: {
        EpidemicMap,
        EpidemicTotal,
        EpidemicLogo,
        EpidemicTitle,
        EpidemicTable,
        EpidemicTrend
    },
    // keep-alive 的情况下仅第一次渲染时会触发。所以肯定需要获取数据
    mounted() {
        this.getAllData()
    },
    // 仅在城市名改变，或者更新时间改变时才触发（待添加）
    activated() {
        // this.getCityNcovCitiesData()
    },
    data() {
        return {
            // curCityCode: '310000'
            series: [],
            districtList: [],
        }
    },
    computed: {
        // 将 vuex store 中的cityCode项使用computed计算属性进行监视。
        // 有变化直接反映。store中的修改由其他组件触发
        ...mapState({curCity: 'city'})
    },
    methods: {
        getLocalNcovData() {
            return getLocalNcov(this.curCity.code)
        },
        getDistrictData() {
            return getDistrictStat(this.curCity.code)
        },
        getAllData() {
            let res1 = this.getLocalNcovData();
            let res2 = this.getDistrictData();
            Promise.all([res1, res2]).then(this.getAllDataSucc)
        },
        getAllDataSucc(datas) {
            console.log(datas)
            let localNov = datas[0]
            let districtStat = datas[1]

            this.series = localNov.series
            this.districtList = districtStat.data.list
        }
    },

}
</script>

<style scoped lang="stylus">

</style>
