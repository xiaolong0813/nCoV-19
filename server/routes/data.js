const express = require('express')
const router = express.Router()
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getGenLinks, getCityLinks} = require('../utils/link')

const axios = require('axios')

// async await 格式。获取某城市（或省）的病毒信息
// router: /cityNcov?id=310000
router.get('/cityNcov', async (req, res, next) => {
    let id = req.query.id  // "310000"
    const res_city = await axios.get(getCityLinks(id).ncov_data_city.city)

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
    let id = req.query.id    // "310000"
    const cities = axios.get(getGenLinks().ncov_data_all.all)

    cities.then(data => {
        if (data.data.err_no === 0) {
            let ret = JSON.parse(data.data.forum.extra.ncov_string_list)
            ret = ret.provinces.filter(province => province.id === id)[0];
            res.json(new SuccessModel(ret))
        } else {
            res.json(new ErrorModel('获取数据失败'))
        }
    })
})

module.exports = router
