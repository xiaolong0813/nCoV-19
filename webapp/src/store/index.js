import Vue from 'vue'
import Vuex from 'vuex'

// 这里引入的Vue是和 main.js 中同一个单例。所以可以直接引入插件
Vue.use(Vuex)

// 查看是否有 localStorage 存储的历史记录，如果有的话则使用，没有就用默认
let defaultCity = {
    name: '上海',
    code: '310000'
}

try {
    if (localStorage.city) {
        defaultCity = localStorage.city
    }
} catch (e) {
    console.log(e)
}

export default new Vuex.Store({
    state: {
        city: defaultCity
    },
    mutations: {
        // 更新city code
        cityCommit: function (state, newCity) {
            state.city = newCity
            // 保存到本地，以便下次加载使用
            try {
                localStorage.city = newCity
            } catch (e) {
                console.log(e)
            }
        }
    }
    // 没有异步需求的话，不用另加 action 触发 mutation，直接调用其中的函数如
    // cityCommit 就好
})
