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
export default {
    name: 'Epidemic',
    components: {
        Logo,
        Header,
        Total
    },
    // keep-alive 的情况下仅第一次渲染时会触发。所以肯定需要获取数据
    mounted() {
        this.getCityNcovData()
    },
    // 仅在城市名改变时才触发
    activated() {

    },
    data() {
        return {
            curCityCode: '310000'

        }
    },
    methods: {
        // 这里应该用promise.all 需要等所有数据得到
        getCityNcovData() {
            axios.get(api.cityNcov + `?id=${this.curCityCode}`)
                .then()


        }
    },

}
</script>

<style scoped lang="stylus">

</style>
