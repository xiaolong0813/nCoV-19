<template>
    <div class="local-header">
        <div class="header-content">
            <div class="brand">
                <div class="brand-left">
                    <img class="logo" src="@/assets/imgs/local.png" alt="">
                    <span class="city-name">{{city}}</span>
                </div>
            </div>
            <img class="img" src="http://p3.pstatp.com/origin/2e95100010f199510654b" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        name: "EpidemicLogo",
        props: {
            city: {
                type: String,
                required: true
            },
        },
    }
</script>

<style scoped lang="stylus">
    .local-header
        overflow hidden
        /*width 100%*/
        /*height 0*/
        /*padding-bottom 26.67%*/
        background-color #f2f2f2
        box-sizing border-box

    .local-header .header-content
        background-image: url(http://p3.pstatp.com/origin/2e95d00011b7e866cb8c7)
        height 2rem
        background-size cover
        padding-top .46rem
        padding-left .48rem
        .brand
            display flex
            .brand-left
                display flex
                flex 1
                padding 0.04rem 0
                height 0.4rem
                .logo
                    vertical-align middle
                    height .32rem
                .city-name
                    color #ffffff
                    font-weight bold
                    font-size .3rem
                    &::before
                        content '·'
                        margin 0 0.06rem
        .img
            height .52rem
            margin-top .24rem





</style>
