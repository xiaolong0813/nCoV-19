// find nearest parent element containing given feature
// 添加 default 后可以在用import引入时不加{}，并可以自己取名。但只能导出一个
export default function getElementByItaClass(ele, classStr) {
    if (ele.classList && ele.classList.contains(classStr))
        return ele
    else if (ele.parentNode)
            return getElementByItaClass(ele.parentNode, classStr)
}
