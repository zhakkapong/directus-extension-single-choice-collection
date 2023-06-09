import { useApi, defineInterface } from '@directus/extensions-sdk';
import { defineComponent, reactive, computed, onMounted, watch, resolveComponent, openBlock, createElementBlock, createBlock, withCtx, createTextVNode, toDisplayString, unref, createCommentVNode, Fragment, renderList, normalizeClass, createElementVNode, createVNode } from 'vue';
import { useI18n } from 'vue-i18n';

const _hoisted_1 = { key: 2 };
const _hoisted_2 = ["onClick"];
const _hoisted_3 = { class: "label" };
const _hoisted_4 = {
  key: 0,
  class: "icon"
};
var script = /* @__PURE__ */ defineComponent({
  __name: "interface",
  props: {
    value: { type: String, required: false },
    source: { type: String, required: false }
  },
  emits: ["input"],
  setup(__props, { emit }) {
    const props = __props;
    const api = useApi();
    const { t } = useI18n();
    const payload = reactive({
      selected: void 0
    });
    const view = reactive({
      loaded: false,
      items: [],
      options: computed(() => {
        return view.items.filter((item) => item.text).map((item) => ({
          text: (item == null ? void 0 : item.text) || "",
          value: (item == null ? void 0 : item.value) || "",
          icon: item == null ? void 0 : item.icon
        }));
      })
    });
    onMounted(() => {
      fetch();
      refreshModel();
    });
    watch(
      () => props.value,
      () => {
        refreshModel();
      }
    );
    function refreshModel() {
      var _a;
      if (props.value) {
        const val = (_a = props.value) == null ? void 0 : _a.toString();
        payload.selected = val;
      }
    }
    async function fetch() {
      if (!props.source) {
        return;
      }
      const collection = props.source;
      const res = await api.get(`items/${collection}/?limit=-1`);
      view.items = res.data.data;
      view.loaded = true;
    }
    function doSelectItem(item) {
      payload.selected = item.value;
      emit("input", payload.selected);
    }
    function checkSelectItem(item) {
      return payload.selected === item.value;
    }
    function getActiveColor(item) {
      return checkSelectItem(item) ? "var(--v-checkbox-color)" : null;
    }
    return (_ctx, _cache) => {
      const _component_v_notice = resolveComponent("v-notice");
      const _component_v_icon = resolveComponent("v-icon");
      return openBlock(), createElementBlock("div", null, [
        !props.source ? (openBlock(), createBlock(_component_v_notice, {
          key: 0,
          type: "warning"
        }, {
          default: withCtx(() => [
            createTextVNode(
              toDisplayString(unref(t)("relationship_not_setup")),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        })) : createCommentVNode("v-if", true),
        view.loaded && (!view.options || view.options.length === 0) ? (openBlock(), createBlock(_component_v_notice, { key: 1 }, {
          default: withCtx(() => [
            createTextVNode(
              toDisplayString(unref(t)("no_items")),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        })) : (openBlock(), createElementBlock("ul", _hoisted_1, [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(view.options, (item, k) => {
              return openBlock(), createElementBlock("li", {
                key: k,
                class: normalizeClass({ "active": checkSelectItem(item) }),
                onClick: ($event) => doSelectItem(item)
              }, [
                createElementVNode("div", _hoisted_3, [
                  createElementVNode(
                    "span",
                    null,
                    toDisplayString(item.text),
                    1
                    /* TEXT */
                  )
                ]),
                item.icon ? (openBlock(), createElementBlock("div", _hoisted_4, [
                  createVNode(_component_v_icon, {
                    name: item.icon,
                    color: getActiveColor(item)
                  }, null, 8, ["name", "color"])
                ])) : createCommentVNode("v-if", true)
              ], 10, _hoisted_2);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]))
      ]);
    };
  }
});

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = "ul[data-v-64969d30] {\n  display: grid;\n  grid-template-columns: auto auto auto;\n  gap: 6px;\n  padding: 0;\n  list-style: none;\n}\nul li[data-v-64969d30] {\n  display: flex;\n  padding: var(--input-padding);\n  border: var(--border-width) solid var(--border-normal);\n  border-radius: var(--border-radius);\n  justify-content: space-between;\n  gap: 6px;\n}\nul li.active[data-v-64969d30] {\n  border-color: var(--v-checkbox-color);\n}";
n(css,{});

script.__scopeId = "data-v-64969d30";
script.__file = "src/interface.vue";

var index = defineInterface({
  id: "single-choice-collection",
  name: "Single choice (collection) ",
  description: "Single choice from a collection",
  icon: "radio_button_checked",
  group: "selection",
  types: ["string"],
  component: script,
  options: () => {
    return [
      {
        field: "source",
        name: "$t:source",
        type: "string",
        meta: {
          width: "full",
          interface: "system-collection",
          options: {
            placeholder: "$t:enter_a_placeholder"
          }
        }
      }
    ];
  }
});

export { index as default };
