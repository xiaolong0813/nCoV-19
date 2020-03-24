<template>
    <div class="total">
        <div class="total-item-allConfirmed">
            <p class="stat-num">414</p>
            <p class="stat-text">累积确诊</p>
            <p class="stat-compare">
                昨日
                <span>+10</span>
            </p>
        </div>
        <div class="total-item-curConfirmed">
            <p class="stat-num">81</p>
            <p class="stat-text">现有确诊</p>
            <p class="stat-compare">
                昨日
                <span>+9</span>
            </p>
        </div>
        <div class="total-item-dead">
            <p class="stat-num">4</p>
            <p class="stat-text">死亡人数</p>
            <p class="stat-compare">
                昨日
                <span>+0</span>
            </p>
        </div>
        <div class="total-item-cured">
            <p class="stat-num">329</p>
            <p class="stat-text">治愈人数</p>
            <p class="stat-compare">
                昨日
                <span>+1</span>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EpidemicTotal"
    }
</script>

<style scoped lang="stylus">
    @import "~styles/global.styl"
    .total
        /*background-color lightyellow*/
        margin-top .16rem
        margin-bottom .18rem
        padding 0 0.26rem
        text-align center
        display flex
        justify-content space-between
        align-items center
        div[class^="total-item"]
            flex 1 0 0

        .total-item-allConfirmed,
        .total-item-allConfirmed span
            color $confirmAllColor
        .total-item-curConfirmed,
        .total-item-curConfirmed span
            color $confirmCurColor
        .total-item-dead,
        .total-item-dead span
            color $deadColor
        .total-item-cured
        .total-item-cured span
            color $curedColor
</style>
