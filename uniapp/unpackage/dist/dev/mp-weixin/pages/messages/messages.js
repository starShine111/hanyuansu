"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      chatList: [
        {
          id: 1,
          name: "汉服交流群",
          icon: "👥",
          avatar: "",
          lastMsg: "有人@了你",
          time: "10:30",
          unread: 3,
          isMention: true,
          online: false,
          isGroup: true
        },
        {
          id: 2,
          name: "订单通知",
          icon: "📦",
          avatar: "",
          lastMsg: "您的订单已发货，请注意查收",
          time: "昨天",
          unread: 0,
          isMention: false,
          online: false,
          isGroup: false
        },
        {
          id: 3,
          name: "汉服种草群",
          icon: "🌸",
          avatar: "",
          lastMsg: "有人分享了新款",
          time: "周一",
          unread: 1,
          isMention: false,
          online: false,
          isGroup: true
        },
        {
          id: 4,
          name: "汉服小仙女",
          icon: "🧚",
          avatar: "",
          lastMsg: "这件太好看了！",
          time: "周二",
          unread: 0,
          isMention: false,
          online: true,
          isGroup: false
        }
      ]
    };
  },
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.chatList, (item, k0, i0) => {
      return common_vendor.e({
        a: item.avatar
      }, item.avatar ? {
        b: item.icon
      } : {
        c: common_vendor.t(item.icon)
      }, {
        d: item.online
      }, item.online ? {} : {}, {
        e: common_vendor.t(item.name),
        f: common_vendor.t(item.time),
        g: common_vendor.t(item.lastMsg),
        h: item.unread
      }, item.unread ? {
        i: common_vendor.t(item.unread > 99 ? "99+" : item.unread)
      } : {}, {
        j: item.isMention
      }, item.isMention ? {} : {}, {
        k: item.id,
        l: common_vendor.o(($event) => _ctx.enterChat(item), item.id)
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/messages/messages.js.map
