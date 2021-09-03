<template>
  <header-logo />
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

    <app-title
      :color-name="colorName"
      :color-hex-value="colorHexValue"
      :style="highlightStyle"
      @closeColorPicker="toggleColorPicker"
    />

    <button-copy-color
      :color-name="colorName"
      :color-hex-value="colorHexValue"
      :style="highlightStyle"
      @activateAlert="activateAlert"
    />

    <footer-notice :color-hex-value="colorHexValue">
      <regenerate-color
        :color-hex-value="colorHexValue"
        @click="this.colorHexValue = this.generateRandomColor()"
      />
    </footer-notice>

    <alert text="Copied color to clipboard" :active="activeAlert" />
  </app-wrapper>
</template>

<script>
import { ColorPicker } from 'vue-color-kit';
import chroma from 'chroma-js';
import AppWrapper from './components/AppWrapper.vue';
import ButtonCopyColor from './components/ButtonCopyColor.vue';
import AppTitle from './components/AppTitle.vue';
import RegenerateColor from './components/RegenerateColor.vue';
import FooterNotice from './components/FooterNotice.vue';
import Alert from './components/Alert.vue';
import HeaderLogo from './components/HeaderLogo.vue';

export default {
  name: 'App',
  components: {
    ColorPicker,
    AppWrapper,
    ButtonCopyColor,
    AppTitle,
    FooterNotice,
    RegenerateColor,
    Alert,
    HeaderLogo,
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
      if (this.isColorValid(this.colorHexValue)) {
        const isDark = chroma(this.colorHexValue)
          .get('lab.l') < 70;

        const mainColor = chroma(this.colorHexValue).hex();
        const secondaryColor = isDark
          ? chroma(this.colorHexValue).brighten(0.8).hex()
          : chroma(this.colorHexValue).darken(0.8).hex();

        return [
          `background: linear-gradient(120deg, ${mainColor} 0%, ${secondaryColor} 100%)`,
          `color: ${isDark ? 'white' : 'inherit'}`,
        ];
      }

      return 'white';
    },
  },
  data() {
    return {
      colorName: '',
      colorHexValue: this.generateRandomColor(),
      isColorPickerHidden: true,
      activeAlert: false,
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
        if (this.isColorValid(this.colorHexValue)) {
          const strippedColor = this.colorHexValue.replace('#', '');
          const data = await fetch(`https://www.thecolorapi.com/id?hex=${strippedColor}`)
            .then((response) => (response.status === 200 ? response.json() : false));
          this.colorName = data.name.value;
        } else {
          this.colorName = 'not a valid color';
        }
      }
    },
    isColorValid(color) {
      return chroma.valid(color);
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
    generateRandomColor() {
      const rdmColor = Math.floor(Math.random() * 16777215).toString(16);
      if (rdmColor.length === 6) {
        return `#${rdmColor}`;
      }
      return this.generateRandomColor();
    },
    activateAlert() {
      if (!this.activeAlert) {
        this.activeAlert = true;
        setTimeout(() => {
          this.activeAlert = false;
        }, 1500);
      }
    },
  },
  created() {
    this.fetchColorName();
  },
};
</script>

<style lang="scss">
@import "~vue-color-kit/dist/vue-color-kit.css";
$warning: #FC462B;

html,
body {
  margin: 0;
  height: 100vh;
}

body {
  background-color: #F8FAFD;
  color: #2C3E50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  max-height: 100vh;
}

#app, .center {
  height: 100%;
}

.colorpicker {
  position: absolute;
  z-index: 100;
}

h2 {
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

.align-bottom {
  position: absolute;
  bottom: 2rem;
}

.justify-center {
  left: 50%;
  transform: translateX(-50%);
}

.justify-right {
  right: 2rem;
}

.qrcode {
  position: absolute;
}
</style>
