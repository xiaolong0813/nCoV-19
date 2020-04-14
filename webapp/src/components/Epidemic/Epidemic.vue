<template>
  <div>
      <epidemic-logo :city="this.curCity.name"></epidemic-logo>
      <div class="block-container">
          <epidemic-title></epidemic-title>
          <epidemic-total></epidemic-total>
<!--          下面两个组件map和table引用了同一个Array类型参数，其指向的是同一个引用型变量districtList-->
<!--          在一个组件中修改该变量另一个也会变，一般不应该直接改动props，而是先赋予子组件data中的变量，再进行修改-->
          <epidemic-map :geoData="geoData" :districtDataList="districtList"></epidemic-map>
          <epidemic-table :list="districtList"></epidemic-table>
          <epidemic-trend :series="series"
          ></epidemic-trend>
            <!--epidemic-trend 也可以使用 v-if="series.length" 判断是否渲染-->
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
    import {
        getLocalNcov,
        getDistrictStat,
        getNormandyInfo
    } from '@/api/local'
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
            geoData: {}
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
        getNormandyInfo() {
            return getNormandyInfo(this.curCity.code)
        },
        getAllData() {
            let resList = []
            resList.push(this.getLocalNcovData());
            resList.push(this.getDistrictData());
            resList.push(this.getNormandyInfo());
            Promise.all(resList).then(this.getAllDataSucc)
        },
        getAllDataSucc(datas) {
            console.log(datas)
            let localNov = datas[0]
            let districtStat = datas[1]
            let normandyInfo = datas[2]

            this.series = localNov.series
            this.districtList = districtStat.data.list
            this.geoData = normandyInfo.data
        }
    },

}
</script>

<style scoped lang="stylus">

</style>
