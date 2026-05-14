const BASE_URL = 'http://127.0.0.1:3000/api'

const request = (options) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: BASE_URL + options.url,
            method: options.method || 'GET',
            data: options.data || {},
            success: (res) => {
				console.log('请求返回:', res.data);
                if (res.data.code === 0) {
                    resolve(res.data.data)
                } else {
                    reject(res.data.message)
                }
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

export default request