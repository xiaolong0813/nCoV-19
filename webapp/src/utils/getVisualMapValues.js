export default function (val) {
    console.log('val：', val)
    let ceil, part, nodes = [5, 10, 20, 50, 100, 200, 500, 1000];
    for (let i = 0; i < nodes.length; i++) {
        if (val < nodes[i]) {
            ceil = nodes[i]
            break
        }
    }
    part = ceil / 5
    return [...Array(6).keys()].map(i => {
        return  i === 0 ? {value: 0} : {min: 1 + part * (i - 1), max: part * i}
    })
}
