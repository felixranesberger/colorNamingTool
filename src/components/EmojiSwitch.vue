<template>
  <img
    v-show="isValidColor"
    :src="require(`@/assets/${imagePath}`)"
    alt="memoji happy"
  />
</template>

<script>
import { defineComponent } from 'vue';
import chroma from 'chroma-js';

export default defineComponent({
  name: 'EmojiSwitch',
  props: {
    color: {
      type: String,
      required: true,
    },
  },
  computed: {
    imagePath() {
      const positiveImages = [
        '1.png',
        '2.png',
        '3.png',
        '4.png',
      ];

      return this.isValidColor
        ? positiveImages[Math.floor(Math.random() * positiveImages.length)]
        : '5.png';
    },
    isValidColor() {
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
