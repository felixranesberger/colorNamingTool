<template>
  <footer class="footer">
    <slot />
    <p class="notice">
      Press the
      <strong :style="boldStyle">colored box </strong>
      to change the color
    </p>
  </footer>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FooterNotice',
  props: {
    colorHexValue: {
      type: String,
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
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: #2c3e50;
}
</style>
