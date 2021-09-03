<template>
  <button
    class="buton--copycolor"
    :style="style"
    @click="copyToClipboard"
  >
    Copy me
  </button>
</template>

<script>
import { defineComponent } from 'vue';
import useClipboard from 'vue-clipboard3';

export default defineComponent({
  name: 'ButtonCopyColor',
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
  computed: {
    copyValue() {
      return `$${this.camelize(this.colorName)}: ${this.colorHexValue};`;
    },
  },
  methods: {
    copyToClipboard() {
      const { toClipboard } = useClipboard();
      toClipboard(this.copyValue);
      this.$emit('activateAlert');
    },
    camelize(str) {
      return str.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => {
        if (p2) return p2.toUpperCase();
        return p1.toLowerCase();
      });
    },
  },
});
</script>

<style lang="scss">
  $warning: #FC462B;

  .buton--copycolor {
    padding: .8rem 3rem;
    border: none;
    border-radius: 3rem;
    background-color: $warning;
    font-weight: bold;
    box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
    animation:  slide-top 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both infinite;
    cursor: pointer;

    &:hover {
      animation-play-state: paused;
    }
  }

  @keyframes slide-top {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-15px);
    }
    100% {
      transform: translateY(0);
    }
  }
</style>
