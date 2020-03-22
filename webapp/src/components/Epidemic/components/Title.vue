<template>
    <div class="block-title">
        <p>
            上海疫情
        </p>
        <p class="block-title-right">
            截止
            2020/03/22 12:26
            <i class="iconfont info-icon">&#xe752;</i>
        </p>
    </div>
</template>

<script>
    export default {
        name: "EpidemicTitle"
    }
</script>

<style scoped lang="stylus">
    .block-title-right
        /*padding-left .12rem*/
        font-size .24rem
        font-weight normal
        color #999999
        position relative
        top .02rem
    .info-icon
        display inline-block
        margin-left -0.05rem
        vertical-align middle
        width .32rem
        height .32rem
        background-size contain
        transform translateY(-1PX)
</style>
