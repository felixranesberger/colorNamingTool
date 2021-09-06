<template>
  <div :class="wrapperClasses">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'AppWrapper',
  props: {
    isColorPickerHidden: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
  computed: {
    wrapperClasses(): Array<string | null> {
      return [
        'center',
        !this.isColorPickerHidden ? 'isActive' : null,
      ];
    },
  },
});
</script>

<style lang="scss">
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .isActive {
    &:after {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(black, 75%);
      content: '';
      z-index: 50;
    }
  }
</style>
