"use strict";
const common_vendor = require("../../common/vendor.js");
const common_request = require("../../common/request.js");
const _sfc_main = {
  data() {
    return {
      imgs: [
        { url: "https://img.alicdn.com/imgextra/i1/2580824255/O1CN01hRkNyi1hIqHoFacKW_!!2580824255-0-alimamacc.jpg" },
        { url: "https://img.alicdn.com/imgextra/i1/2200531469719/O1CN01n7RZXY2LfMObpMREl_!!2200531469719-0-alimamacc.jpg" },
        { url: "https://img.alicdn.com/img/i3/486840129/O1CN01AaBXFE1Cp8C2osqe1_!!4611686018427385665-0-saturn_solar.jpg" },
        { url: "https://img.alicdn.com/imgextra/i2/4293584275/O1CN01SOHk6t1hS0CQl7M6F_!!4293584275-0-alimamacc.jpg" }
      ],
      tagImgs: [
        { dynasty: "wei", name: "魏晋", url: "/static/images/wei.png" },
        { dynasty: "tang", name: "唐", url: "/static/images/tang.png" },
        { dynasty: "song", name: "宋", url: "/static/images/song.png" },
        { dynasty: "ming", name: "明", url: "/static/images/ming.png" }
      ],
      activeDynasty: "",
      productList: [],
      loading: false
    };
  },
  computed: {},
  onLoad() {
    this.fetchProducts();
  },
  methods: {
    // 获取商品数据
    async fetchProducts() {
      this.loading = true;
      common_vendor.index.__f__("log", "at pages/index/index.vue:86", "开始请求，朝代：", this.activeDynasty);
      try {
        const res = await common_request.request({
          url: "/products",
          data: { dynasty: this.activeDynasty }
        });
        common_vendor.index.__f__("log", "at pages/index/index.vue:94", "res是：", res);
        this.productList = res;
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/index/index.vue:99", "请求错误:", error);
        common_vendor.index.showToast({
          title: "获取数据失败",
          icon: "none"
        });
      } finally {
        this.loading = false;
      }
    },
    // 切换朝代
    switchDynasty(dynasty) {
      common_vendor.index.__f__("log", "at pages/index/index.vue:111", "当前选择：", dynasty);
      this.activeDynasty = dynasty;
      this.fetchProducts();
      const tag = this.tagImgs.find((item) => item.dynasty === dynasty);
      if (tag) {
        common_vendor.index.showToast({
          title: tag.name,
          icon: "none",
          duration: 1e3
        });
      }
    },
    // 跳转商品详情
    goToDetail(productId) {
      common_vendor.index.__f__("log", "at pages/index/index.vue:130", "点击跳转详情页");
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?id=${productId}`
      });
    }
  }
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
  return common_vendor.e({
    a: common_vendor.f($data.imgs, (item, index, i0) => {
      return {
        a: item.url,
        b: index
      };
    }),
    b: common_vendor.p({
      type: "sound",
      size: "30"
    }),
    c: common_vendor.f($data.tagImgs, (item, index, i0) => {
      return {
        a: item.url,
        b: common_vendor.o(($event) => $options.switchDynasty(item.dynasty), index),
        c: index,
        d: $data.activeDynasty === item.dynasty ? 1 : "",
        e: "02e35741-2-" + i0 + ",02e35741-1"
      };
    }),
    d: common_vendor.p({
      span: 6
    }),
    e: !$data.loading
  }, !$data.loading ? common_vendor.e({
    f: common_vendor.f($data.productList, (item, k0, i0) => {
      return {
        a: item.main_image,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.price),
        d: common_vendor.o(($event) => $options.goToDetail(item.id), item.id),
        e: item.id,
        f: "02e35741-4-" + i0 + ",02e35741-3"
      };
    }),
    g: common_vendor.p({
      xs: 12,
      sm: 8,
      md: 6,
      lg: 4,
      xl: 3
    }),
    h: $data.loading
  }, $data.loading ? {} : {}) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
