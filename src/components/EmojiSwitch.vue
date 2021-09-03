<template>
  <img
    v-show="isValidColor"
    src="@/assets/emoji_worked.png"
    alt="memoji happy"
  />
  <img
    v-show="!isValidColor"
    src="@/assets/emoji_not_working.png"
    alt="memoji sad"
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
