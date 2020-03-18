// const cityCode = '310000'
// const cityName = 'shanghai'

function getGenLinks() {
    return {
        ncov_data_all: 'https://i.snssdk.com/forum/home/v1/info/?forum_id=1656784762444839',
        index_national: 'http://121.36.4.93:5000/national',
        news: 'https://i.snssdk.com/api/feed/forum_flow/v1/?query_id=1656810113086509&tab_id=1656810113086525&category=forum_flow_subject&is_preview=0&stream_api_version=82&aid=13&offset=0&count=20',
        safeguard: 'https://i.snssdk.com/api/feed/forum_flow/v1/?query_id=1656806647707693&tab_id=1656806647707709&category=forum_flow_subject&is_preview=0&stream_api_version=82&aid=13&offset=0&count=20'
    }
}

function getCityLinks(cityCode) {
    return {
        ncov_data_city: `https://i.snssdk.com/forum/ncov_data/?data_type=%5B1%5D&city_code=%5B%22${cityCode}%22%5D`,
        track: `https://i.snssdk.com/toutiao/normandy/pneumonia_trending/track_list/?city_code=${cityCode}`,
        shanghai_index: `http://121.36.4.93:5000/shanghai`
    }
}

// commonJS 规范
module.exports = {
    getGenLinks,
    getCityLinks
}
// export default links

