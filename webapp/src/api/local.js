import request from '@/utils/request'

const isDev = process.env.NODE_ENV === 'development'

function getEnvUrl(url) {
    return isDev ? url + '.json' : url
}

export function getLocalNcov(id) {
    return request({
        url: getEnvUrl('local/ncov_data'),
        method: 'get',
        params: { id }
    })
}

export function getDistrictStat(id) {
    return request({
        url: getEnvUrl('local/district_stat'),
        method: 'get',
        params: { id }
    })
}
