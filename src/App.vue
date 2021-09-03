<template>
  <app-wrapper
    :is-color-picker-hidden="isColorPickerHidden"
    @click.self="deactivateColorPicker"
  >
    <ColorPicker
      v-show="!isColorPickerHidden"
      :color="colorName"
      :colors-default="colorPickerDefaultColors"
      theme="dark"
      class="colorpicker"
      @changeColor="updateColor"
    />

    <h1>Hi! I'm
      <span
        class="colorHighlight"
        :style="highlightStyle"
        @click="toggleColorPicker"
      >
        {{ colorName }}
      </span>
      <emoji-switch :color="colorHexValue" />
    </h1>
    <button-copy-color
      :color-name="colorName"
      :color-hex-value="colorHexValue"
      :style="highlightStyle"
    />
    <footer-notice />
  </app-wrapper>
</template>

<script>
import { ColorPicker } from 'vue-color-kit';
import chroma from 'chroma-js';
import 'vue-color-kit/dist/vue-color-kit.css';
import AppWrapper from './components/AppWrapper.vue';
import EmojiSwitch from './components/EmojiSwitch.vue';
import ButtonCopyColor from './components/ButtonCopyColor.vue';
import FooterNotice from './components/FooterNotice.vue';

export default {
  name: 'App',
  components: {
    ColorPicker,
    AppWrapper,
    EmojiSwitch,
    ButtonCopyColor,
    FooterNotice,
  },
  computed: {
    colorPickerDefaultColors() {
      return [
        '#A5C85A',
        '#32DCE6',
        '#D24632',
        '#FAF046',
        '#FF8000',
        '#858C8C',
        '#0A1919',
        '#2862E9',
      ];
    },
    highlightStyle() {
      if (chroma.valid(this.colorHexValue)) {
        const isDark = chroma(this.colorHexValue)
          .get('lab.l') < 70;
        return {
          backgroundColor: this.colorHexValue,
          color: isDark ? 'white' : 'inherit',
        };
      }

      return 'white';
    },
  },
  data() {
    return {
      colorName: '',
      colorHexValue: '#EEEEEE',
      isColorPickerHidden: true,
    };
  },
  watch: {
    colorHexValue() {
      this.fetchColorName();
    },
  },
  methods: {
    async fetchColorName() {
      if (this.isColorPickerHidden) {
        if (chroma.valid(this.colorHexValue)) {
          const strippedColor = this.colorHexValue.replace('#', '');
          const data = await fetch(`https://api.color.pizza/v1/${strippedColor}`)
            .then((response) => (response.status === 200 ? response.json() : false));
          this.colorName = data.colors[0].name;
        } else {
          this.colorName = 'not a valid color';
        }
      }
    },
    updateColor(data) {
      this.colorHexValue = data.hex;
    },
    deactivateColorPicker() {
      if (!this.isColorPickerHidden) {
        this.isColorPickerHidden = true;
        if (this.colorHexValue.charAt(0) !== '#') {
          this.colorHexValue = `#${this.colorHexValue}`;
        }
        this.fetchColorName();
      }
    },
    toggleColorPicker() {
      this.isColorPickerHidden = !this.isColorPickerHidden;
    },
  },
  mounted() {
    this.fetchColorName();
  },
};
</script>

<style lang="scss">
$warning: #FC462B;

html,
body {
  margin: 0;
  height: 100vh;
}

body {
  background-color: #F8FAFD;
  max-height: 100vh;
}

#app, .center {
  height: 100%;
}

.colorpicker {
  position: absolute;
  z-index: 100;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1 {
  display: flex;
  font-weight: bold;
  font-size: 70px;
  align-items: center;
}

.colorHighlight {
  margin: 0 0 0 1.5rem;
  display: inline-block;
  position: relative;
  padding: 5px 25px;
  background-color: $warning;
  transition: all ease-in .2s,  width 0.25s;

  &:hover {
    cursor: pointer;
    background-color: darken($warning, 2%);
    transform: scale(.99);
   }
}
</style>
