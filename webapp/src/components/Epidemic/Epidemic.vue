<template>
  <div>
      <logo></logo>
      <header></header>
      <total></total>
  </div>
</template>

<script>
    import Logo from "./parts/Logo";
    import Header from "./parts/Header";
    import Total from "./parts/Total";
    import axios from 'axios'
    import api from '@/Utils/API'
    import { mapState } from 'vuex'
export default {
    name: 'Epidemic',
    components: {
        Logo,
        Header,
        Total
    },
    // keep-alive 的情况下仅第一次渲染时会触发。所以肯定需要获取数据
    mounted() {
        this.getCityNcovCitiesData()
    },
    // 仅在城市名改变，或者更新时间改变时才触发（待添加）
    activated() {
        this.getCityNcovCitiesData()
    },
    data() {
        return {
            // curCityCode: '310000'

        }
    },
    computed: {
        // 将 vuex store 中的cityCode项使用computed计算属性进行监视。
        // 有变化直接反映。store中的修改由其他组件触发
        ...mapState({curCityCode: 'cityCode'})
    },
    methods: {
        getCityNcovData() {
            return axios.get(api.cityNcov + `?id=${this.curCityCode}`)
        },
        getCitiesData() {
            return axios.get(api.cities + `?id=${this.curCityCode.slice(0, 2)}`)
        },
        getCityNcovCitiesData() {
            let res1 = this.getCityNcovData()
            let res2 = this.getCitiesData()
            Promise.all([res1, res2]).then(this.getCityNcovCitiesDataSucc)
        },
        getCityNcovCitiesDataSucc(datas) {
            console.log(datas)
        }
    },

}
</script>

<style scoped lang="stylus">

</style>
