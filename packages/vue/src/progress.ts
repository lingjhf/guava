import type { PropType } from "vue";
import type { GProgressProps } from "@lingjhf/guava";
import { defineComponent, h } from "vue";
import "@lingjhf/guava/lib/progress";

export default defineComponent({
  props: {
    percentage: Number as PropType<GProgressProps["percentage"]>,
  },
  setup(props) {
    return () =>
      h("g-progress", {
        percentage: props.percentage,
      });
  },
});
