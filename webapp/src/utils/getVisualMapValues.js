export default function (maxVal) {
    console.log('床过来的max：', maxVal)


    return [...Array(6).keys()].map(i => {
        return  i === 0 ? {value: 0} : {min: 1 + 20 * (i - 1), max: 20 * i}
    })
}
