"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      orderList: [
        { url: "/static/connection/wallet.png", title: "待付款" },
        { url: "/static/connection/ship.png", title: "待发货" },
        { url: "/static/connection/receive.png", title: "待收货" },
        { url: "/static/connection/comment.png", title: "待评论" }
      ],
      meTool: [
        { url: "/static/connection/money.png", title: "我的余额" },
        { url: "/static/connection/points.png", title: "我的积分" },
        { url: "/static/connection/coupon.png", title: "我的礼卷" },
        { url: "/static/connection/favorite.png", title: "我的收藏" },
        { url: "/static/connection/address1.png", title: "我的地址" },
        { url: "/static/connection/customerService.png", title: "联系客服" }
      ]
    };
  },
  methods: {}
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  (_easycom_uni_icons2 + _easycom_uni_col2 + _easycom_uni_row2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_col = () => "../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_row = () => "../../uni_modules/uni-row/components/uni-row/uni-row.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_col + _easycom_uni_row)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "gear",
      size: "30",
      color: "black"
    }),
    b: common_vendor.p({
      type: "right",
      size: "20",
      color: "#bebebe;"
    }),
    c: common_vendor.f($data.orderList, (item, index, i0) => {
      return {
        a: item.url,
        b: common_vendor.t(item.title),
        c: index,
        d: "3cd1a15b-3-" + i0 + ",3cd1a15b-2"
      };
    }),
    d: common_vendor.p({
      span: 6
    }),
    e: common_vendor.f($data.meTool, (item, index, i0) => {
      return {
        a: item.url,
        b: common_vendor.t(item.title),
        c: index,
        d: "3cd1a15b-5-" + i0 + ",3cd1a15b-4"
      };
    }),
    f: common_vendor.p({
      span: 8
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/me/me.js.map
