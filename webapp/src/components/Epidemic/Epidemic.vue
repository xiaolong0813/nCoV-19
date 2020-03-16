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
export default {
    name: 'Epidemic',
    components: {
        Logo,
        Header,
        Total
    },
    // keep-alive 的情况下仅第一次渲染时会触发。所以肯定需要获取数据
    mounted() {
        // this.
    },
    // 仅在城市名改变时才触发
    activated() {

    },
    data() {
        return {
            // cityData:

        }
    }

}
</script>

<style scoped lang="stylus">

</style>
