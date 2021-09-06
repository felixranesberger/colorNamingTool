<template>
  <img
    v-show="isValidColor"
    :src="require(`@/assets/${imagePath}`)"
    alt="memoji happy"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import chroma from 'chroma-js';

export default defineComponent({
  name: 'EmojiSwitch',
  props: {
    color: {
      type: String as PropType<string>,
      required: true,
    },
  },
  computed: {
    imagePath(): string {
      const positiveImages = [
        '1.png',
        '2.png',
        '3.png',
        '4.png',
        '6.png',
      ];

      return this.isValidColor
        ? positiveImages[Math.floor(Math.random() * positiveImages.length)]
        : '5.png';
    },
    isValidColor(): boolean {
      return chroma.valid(this.color);
    },
  },
});
</script>

<style lang="scss">
  img {
    margin-left: .4rem;
    height: 96px;
    width: auto;
  }
</style>
