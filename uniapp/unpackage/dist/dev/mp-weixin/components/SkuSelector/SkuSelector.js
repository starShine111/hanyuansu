"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "SkuSelector",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    product: {
      type: Object,
      default: () => ({})
    },
    specList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedSpecs: {},
      quantity: 1
    };
  },
  computed: {
    finalPrice() {
      const currentSku = this.getCurrentSku();
      return currentSku && currentSku.price ? currentSku.price : this.product.price;
    },
    totalPrice() {
      return (this.finalPrice * this.quantity).toFixed(2);
    },
    currntSelectedSpecs() {
      return this.selectedSpecs;
    }
  },
  watch: {
    specList: {
      immediate: true,
      deep: true,
      handler(newSpecList) {
        const defaultSpecs = {};
        newSpecList.forEach((spec) => {
          if (spec.options && spec.options.length > 0) {
            defaultSpecs[spec.name] = spec.options[0];
          }
        });
        this.selectedSpecs = defaultSpecs;
      }
    }
  },
  methods: {
    // 获取商品规格
    getCurrentSku() {
      if (!this.product.skuList || this.product.skuList.length === 0)
        return null;
      return this.product.skuList.find((sku) => {
        if (!sku || !sku.specs)
          return false;
        for (let specName in this.selectedSpecs) {
          if (sku.specs[specName] !== this.selectedSpecs[specName]) {
            return false;
          }
        }
        return true;
      });
    },
    isSpecDisabled(specName, option) {
      if (!this.product.skuList || this.product.skuList.length === 0)
        return false;
      const testSpecs = { ...this.selectedSpecs };
      testSpecs[specName] = option;
      const hasMatch = this.product.skuList && this.product.skuList.some((sku) => {
        if (!sku || !sku.specs)
          return false;
        for (let key in testSpecs) {
          if (sku.specs[key] !== testSpecs[key]) {
            return false;
          }
        }
        return true;
      });
      return !hasMatch;
    },
    selectSpec(specName, option) {
      if (this.isSpecDisabled(specName, option))
        return;
      this.$set(this.selectedSpecs, specName, option);
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    increaseQuantity() {
      const currentSku = this.getCurrentSku();
      const maxStock = currentSku ? currentSku.stock : this.product.stock;
      if (this.quantity < maxStock) {
        this.quantity++;
      } else {
        common_vendor.index.showToast({
          title: "库存不足",
          icon: "none"
        });
        this.quantity = maxStock;
      }
    },
    validateQuantity(e) {
      let value = parseInt(e.detail.value);
      const currentSku = this.getCurrentSku();
      const maxStock = currentSku ? currentSku.stock : this.product.stock;
      if (isNaN(value)) {
        this.quantity = 1;
        return;
      }
      if (value < 1) {
        this.quantity = 1;
        return;
      }
      if (value > maxStock) {
        common_vendor.index.showToast({
          title: "库存不足",
          icon: "none"
        });
        this.quantity = maxStock;
      } else {
        this.quantity = value;
      }
    },
    close() {
      this.$emit("close");
    },
    confirm() {
      const result = {
        specs: this.selectedSpecs,
        quantity: this.quantity,
        totalPrice: this.totalPrice,
        sku: this.getCurrentSku()
      };
      this.$emit("confirm", result);
      this.close();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.visible
  }, $props.visible ? {
    b: common_vendor.o((...args) => $options.close && $options.close(...args)),
    c: $props.product.image,
    d: common_vendor.t($options.finalPrice),
    e: common_vendor.f($props.specList, (spec, specIndex, i0) => {
      return {
        a: common_vendor.t(spec.name),
        b: common_vendor.f(spec.options, (option, optionIndex, i1) => {
          return {
            a: common_vendor.t(option),
            b: optionIndex,
            c: common_vendor.n($data.selectedSpecs[spec.name] === option ? "active" : ""),
            d: common_vendor.n($options.isSpecDisabled(spec.name, option) ? "disabled" : ""),
            e: common_vendor.o(($event) => $options.selectSpec(spec.name, option), optionIndex)
          };
        }),
        c: specIndex
      };
    }),
    f: common_vendor.o((...args) => $options.decreaseQuantity && $options.decreaseQuantity(...args)),
    g: common_vendor.o((...args) => $options.validateQuantity && $options.validateQuantity(...args)),
    h: $data.quantity,
    i: common_vendor.o(($event) => $data.quantity = $event.detail.value),
    j: common_vendor.o((...args) => $options.increaseQuantity && $options.increaseQuantity(...args)),
    k: common_vendor.t($options.totalPrice),
    l: common_vendor.o((...args) => $options.confirm && $options.confirm(...args)),
    m: common_vendor.o(() => {
    }),
    n: common_vendor.o((...args) => $options.close && $options.close(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/SkuSelector/SkuSelector.js.map
