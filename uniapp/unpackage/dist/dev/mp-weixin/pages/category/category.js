"use strict";
const common_vendor = require("../../common/vendor.js");
const common_request = require("../../common/request.js");
const _sfc_main = {
  data() {
    return {
      sidebarItems: [
        { dynasty: "wei", title: "魏晋" },
        { dynasty: "tang", title: "唐制" },
        { dynasty: "song", title: "宋制" },
        { dynasty: "ming", title: "明制" }
      ],
      activeDynasty: "",
      productList: [],
      loading: false
    };
  },
  onLoad() {
    this.fetchProducts();
  },
  methods: {
    // 获取商品数据
    async fetchProducts() {
      this.loading = true;
      try {
        const res = await common_request.request({
          url: "/products",
          data: { dynasty: this.activeDynasty }
        });
        this.productList = res;
      } catch (error) {
        common_vendor.index.__f__("log", "at pages/category/category.vue:64", "请求错误：", error);
        common_vendor.index.showToast({
          title: "获取数据失败",
          icon: "none"
        });
      } finally {
        this.loading = false;
      }
    },
    handleSidebar(dynasty) {
      this.activeDynasty = dynasty;
      this.fetchProducts();
      const tag = this.sidebarItems.find((item) => item.dynasty === dynasty);
      if (tag) {
        common_vendor.index.showToast({
          title: tag.title,
          icon: "none",
          duration: 1e3
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  (_easycom_uni_col2 + _easycom_uni_row2)();
}
const _easycom_uni_col = () => "../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_row = () => "../../uni_modules/uni-row/components/uni-row/uni-row.js";
if (!Math) {
  (_easycom_uni_col + _easycom_uni_row)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.sidebarItems, (item, index, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.o(($event) => $options.handleSidebar(item.dynasty), index),
        c: index,
        d: $data.activeDynasty === item.dynasty ? 1 : ""
      };
    }),
    b: !$data.loading
  }, !$data.loading ? {
    c: common_vendor.f($data.productList, (item, k0, i0) => {
      return {
        a: item.main_image,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.price),
        d: item.id,
        e: "8c1c8e4a-1-" + i0 + ",8c1c8e4a-0"
      };
    }),
    d: common_vendor.p({
      xs: 12,
      sm: 8,
      md: 6,
      lg: 4,
      xl: 3
    }),
    e: common_vendor.p({
      gutter: _ctx.gutter
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/category/category.js.map
