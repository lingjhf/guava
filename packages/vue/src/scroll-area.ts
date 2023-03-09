import type { PropType } from "vue";
import type { GScrollAreaProps } from "@lingjhf/guava";
import { defineComponent, h } from "vue";
import "@lingjhf/guava/lib/scroll-area";

export default defineComponent({
  props: {
    scrollX: Number as PropType<GScrollAreaProps["scrollX"]>,
    scrollY: Number as PropType<GScrollAreaProps["scrollY"]>,
    type: String as PropType<GScrollAreaProps["type"]>,
    scroll: Function as PropType<GScrollAreaProps["scroll"]>,
  },
  setup(props, { slots }) {
    return () =>
      h(
        "g-scroll-area",
        {
          "scroll-x": props.scrollX,
          "scroll-y": props.scrollY,
          type: props.type,
          ref(ref: unknown) {
            const dom = ref as GScrollAreaProps;
            dom.scroll = props.scroll;
          },
        },
        {
          default: () => (slots.default ? slots.default() : null),
        }
      );
  },
});
