export default function (maxVal) {
    console.log('床过来的max：', maxVal)
    let val, list
    val = 20
    list = [...Array(5).keys()].map(i => {
        return  `${1 + 20 * i}-${20 * (i + 1)}`
    })
    return {
        val,
        list
    }

}
