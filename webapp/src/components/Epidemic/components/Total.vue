<template>
    <div class="total">
        <div class="total-item-allConfirmed">
            <p class="stat-num">{{total.confirmedTotal}}</p>
            <p class="stat-text">累积确诊</p>
            <p class="stat-compare">
                {{incr.confirmedIncrPrefix}}
                <span>{{incr.confirmedIncrStr}}</span>
            </p>
        </div>
        <div class="total-item-curConfirmed">
            <p class="stat-num">{{total.treatingTotal}}</p>
            <p class="stat-text">现有确诊</p>
            <p class="stat-compare">
                {{incr.treatingIncrPrefix}}
                <span>{{incr.treatingIncrStr}}</span>
            </p>
        </div>
        <div class="total-item-dead">
            <p class="stat-num">{{total.deathsTotal}}</p>
            <p class="stat-text">死亡人数</p>
            <p class="stat-compare">
                {{incr.deathsIncrPrefix}}
                <span>{{incr.deathsIncrStr}}</span>
            </p>
        </div>
        <div class="total-item-cured">
            <p class="stat-num">{{total.curesTotal}}</p>
            <p class="stat-text">治愈人数</p>
            <p class="stat-compare">
                {{incr.curesIncrPrefix}}
                <span>{{incr.curesIncrStr}}</span>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EpidemicTotal",
        props: {
            total: {
                type: Object,
                required: true
            },
            incr: {
                type: Object,
                required: true
            }
        },
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
