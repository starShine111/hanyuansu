"use strict";
const common_vendor = require("./vendor.js");
const BASE_URL = "http://127.0.0.1:3000/api";
const request = (options) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: BASE_URL + options.url,
      method: options.method || "GET",
      data: options.data || {},
      success: (res) => {
        common_vendor.index.__f__("log", "at common/request.js:10", "请求返回:", res.data);
        if (res.data.code === 0) {
          resolve(res.data.data);
        } else {
          reject(res.data.message);
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};
exports.request = request;
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/request.js.map
