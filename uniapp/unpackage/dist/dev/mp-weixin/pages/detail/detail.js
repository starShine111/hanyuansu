"use strict";
const common_vendor = require("../../common/vendor.js");
const common_request = require("../../common/request.js");
const SkuSelector = () => "../../components/SkuSelector/SkuSelector.js";
const _sfc_main = {
  data() {
    return {
      detail: {
        images: [],
        skus: [],
        price: 0,
        original_price: 0
      },
      loading: false,
      showSelector: false,
      currentAction: "",
      productData: {
        image: "",
        price: 0,
        stock: 0,
        skuList: []
      },
      specList: {},
      cartCount: 0
    };
  },
  components: {
    SkuSelector
  },
  methods: {
    getTotalStock(skus) {
      if (!skus || skus.length === 0)
        return 0;
      let total = 0;
      skus.forEach((sku) => {
        total += sku.stock || 0;
      });
      return total;
    },
    // 转换成SKU列表格式
    // 用于匹配价格和库存
    convertSkuList(skus) {
      if (!skus || skus.length === 0)
        return false;
      return skus.map((sku) => {
        return {
          specs: {
            "颜色": sku.color,
            "尺码": sku.size
          },
          price: parseFloat(sku.price),
          stock: parseInt(sku.stock),
          id: sku.id
        };
      });
    },
    // 提取规格列表（规格按钮）
    extractSpecList(skus) {
      if (!skus || skus.length === 0)
        return false;
      const colors = /* @__PURE__ */ new Set();
      const sizes = /* @__PURE__ */ new Set();
      skus.forEach((sku) => {
        if (sku.color)
          colors.add(sku.color);
        if (sku.size)
          sizes.add(sku.size);
      });
      const specList = [];
      if (colors.size > 0) {
        specList.push({
          name: "颜色",
          options: Array.from(colors)
        });
      }
      if (sizes.size > 0) {
        specList.push({
          name: "尺码",
          options: Array.from(sizes)
        });
      }
      return specList;
    },
    // 获取商品详情
    async fetchDetail(id) {
      this.loading = true;
      try {
        const res = await common_request.request({
          url: `/products/${id}`
        });
        this.detail = res;
        common_vendor.index.__f__("log", "at pages/detail/detail.vue:151", "原始 skus:", res.skus);
        const convertedList = this.convertSkuList(res.skus);
        this.productData = {
          image: res.images && res.images[0] ? res.images[0] : "",
          price: res.skus && res.skus[0] ? res.skus[0].price : 0,
          stock: res.skus ? this.getTotalStock(res.skus) : 0,
          skuList: this.convertSkuList(res.skus)
          //转换SKU列表
        };
        this.specList = this.extractSpecList(res.skus);
        common_vendor.index.__f__("log", "at pages/detail/detail.vue:162", "商品详情：", res);
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/detail/detail.vue:165", "请求错误:", error);
        common_vendor.index.showToast({
          title: "获取数据失败",
          icon: "none"
        });
      } finally {
        this.loading = false;
      }
    },
    openSkuSelector(action) {
      this.currentAction = action;
      this.showSelector = true;
    },
    addToCart() {
      common_vendor.index.showToast({
        title: "加入购物车",
        icon: "success"
      });
    },
    buyNow() {
      common_vendor.index.showToast({
        title: `购买 ${orderInfo.quantity} 件`,
        icon: "success"
      });
    },
    // 跳转购物车
    goToCart() {
      common_vendor.index.navigateTo({
        url: "/pages/cart/cart"
      });
    }
  },
  onLoad(options) {
    const productId = options.id;
    this.fetchDetail(productId);
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_SkuSelector2 = common_vendor.resolveComponent("SkuSelector");
  (_easycom_uni_icons2 + _easycom_SkuSelector2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_SkuSelector = () => "../../components/SkuSelector/SkuSelector.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_SkuSelector)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.loading
  }, !$data.loading ? {
    b: common_vendor.f($data.detail.images, (img, index, i0) => {
      return {
        a: img,
        b: index
      };
    })
  } : {}, {
    c: $data.detail.skus && $data.detail.skus.length > 0
  }, $data.detail.skus && $data.detail.skus.length > 0 ? {
    d: common_vendor.t($data.detail.skus[0].price),
    e: common_vendor.t($data.detail.skus[0].sales)
  } : {}, {
    f: common_vendor.t($data.detail.name),
    g: common_vendor.p({
      type: "cart",
      size: "30"
    }),
    h: $data.cartCount > 0
  }, $data.cartCount > 0 ? {
    i: common_vendor.t($data.cartCount)
  } : {}, {
    j: common_vendor.o((...args) => $options.goToCart && $options.goToCart(...args)),
    k: common_vendor.o(($event) => $options.openSkuSelector("addToCart")),
    l: common_vendor.o(($event) => $options.openSkuSelector("buy")),
    m: common_vendor.o(($event) => {
      $data.showSelector = false;
    }),
    n: common_vendor.o(_ctx.handleOrderConfirm),
    o: common_vendor.p({
      visible: $data.showSelector,
      product: $data.productData,
      specList: $data.specList
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/detail/detail.js.map
