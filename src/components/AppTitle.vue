<template>
  <h1>Hi! I'm
    <span
      class="colorHighlight"
      :style="style"
      @click="emitClick"
    >
        {{ colorName }}
    </span>

    <emoji-switch :color="colorHexValue"/>
  </h1>
</template>

<script>
import { defineComponent } from 'vue';
import EmojiSwitch from './EmojiSwitch.vue';

export default defineComponent({
  name: 'AppTitle',
  components: {
    EmojiSwitch,
  },
  props: {
    colorName: {
      type: String,
      required: true,
    },
    colorHexValue: {
      type: String,
      required: true,
    },
    style: {
      type: Object,
      required: true,
    },
  },
  methods: {
    emitClick() {
      this.$emit('closeColorPicker');
    },
  },
});
</script>
