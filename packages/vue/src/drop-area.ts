import type { PropType } from "vue";
import type { GDropAreaProps } from "@lingjhf/guava";
import { defineComponent, h } from "vue";
import "@lingjhf/guava/lib/drop-area";

export default defineComponent({
  props: {
    items: Array as PropType<GDropAreaProps["items"]>,
    horizontal: Boolean as PropType<GDropAreaProps["horizontal"]>,
    switchWhileCrossEdge: Boolean as PropType<
      GDropAreaProps["switchWhileCrossEdge"]
    >,
  },
  setup(props) {
    return () =>
      h("g-drop-area", {
        items: props.items,
        horizontal: props.horizontal,
        "switch-while-cross-edge": props.switchWhileCrossEdge,
      });
  },
});
