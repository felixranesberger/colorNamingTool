<template>
  <h2>Hi! I'm
    <span
      class="colorHighlight"
      :style="style"
      @click="emitClick"
    >
        {{ colorName }}
    </span>

    <emoji-switch :color="colorHexValue"/>
  </h2>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import EmojiSwitch from './EmojiSwitch.vue';

export default defineComponent({
  name: 'AppTitle',
  components: {
    EmojiSwitch,
  },
  props: {
    colorName: {
      type: String as PropType<string>,
      required: true,
    },
    colorHexValue: {
      type: String as PropType<string>,
      required: true,
    },
    style: {
      type: Object,
      required: true,
    },
  },
  methods: {
    emitClick(): void {
      this.$emit('closeColorPicker');
    },
  },
});
</script>
