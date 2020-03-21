const express = require('express')
const router = express.Router()
const { SuccessModel, ErrorModel } = require('../model/resModel')
const links = { getGenLinks, getCityLinks} = require('../utils/link')
// 测试一下 require 得到的是单例。同样 import也是基于require
links.test = 1988
const test = require('../utils/test')

const axios = require('axios')

// async await 格式。获取某城市（或省）的病毒信息
// router: /cityNcov?id=310000
router.get('/cityNcov', async (req, res, next) => {
    let id = req.query.id  // "310000"
    const res_city = await axios.get(getCityLinks(id).ncov_data_city)

    if (res_city.status === 200) {
        const ret = JSON.parse(res_city.data.ncov_city_data[id])
        res.json(new SuccessModel(ret))
    } else {
        res.json(new ErrorModel('获取数据失败'))
    }
})

// .then 格式。获取某个省内所有城市/区的信息
// router: /cities?id=31
router.get('/cities', (req, res, next) => {
    let id = req.query.id
    const cities = axios.get(getGenLinks().ncov_data_all)

    cities.then(data => {
        if (data.data.err_no === 0) {
            let ret = JSON.parse(data.data.forum.extra.ncov_string_list)
            ret = ret.provinces.filter(province => province.id === id)[0];
            res.json(new SuccessModel(ret.cities))
        } else {
            res.json(new ErrorModel('获取数据失败'))
        }
    })
})

// 返回城市更新时间
router.get('/cityUpdateTime', (req, res, next) => {
    let id = req.query.id


})

module.exports = router
