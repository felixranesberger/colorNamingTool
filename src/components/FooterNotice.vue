<template>
  <footer class="footer align-bottom justify-center">
    <slot />
    <p class="notice">
      Press the
      <strong :style="boldStyle">colored box </strong>
      to change the color
    </p>
  </footer>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'FooterNotice',
  props: {
    colorHexValue: {
      type: String as PropType<string>,
      required: true,
    },
  },
  computed: {
    boldStyle() {
      return {
        color: this.colorHexValue,
      };
    },
  },
});
</script>

<style lang="scss">
  .footer {
    color: #2c3e50;
  }
</style>
