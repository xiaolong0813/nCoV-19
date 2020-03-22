// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// CSS
import 'styles/reset.css'
import 'styles/border.css'
import 'styles/global.styl'
import 'styles/iconfont.css'

// bable-polyfill
import 'babel-polyfill'

// vuex store 实例
import store from './store/index'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
