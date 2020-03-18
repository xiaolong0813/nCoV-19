class BaseModel {
    constructor(data, mes) {
        // 传入的是 1). 数据对象和 2). 信息字符串
        // 如果只传入信息字符串，即赋予data字符串，则将其赋予 this.message，此时没有数据对象传入
        if (typeof data === 'string') {
            this.mes = data
            data = null
            mes = null
        }
        if (data) {
            this.data = data
        }
        if (mes) {
            this.mes = mes
        }
    }
}

class SuccessModel extends BaseModel{
    constructor(data, mes) {
        super(data, mes)
        this.errNo = 0
    }
}

class ErrorModel extends BaseModel{
    constructor(data, mes) {
        super(data, mes)
        this.errNo = -1
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}
