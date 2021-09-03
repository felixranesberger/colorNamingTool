<template>
  <div
    class="center"
    :class="!isColorPickerHidden ? 'isActive' : false"
    @click.self="deactivateColorPicker"
  >
    <ColorPicker
      theme="dark"
      :color="color"
      :colors-default="colorPickerDefaultColors"
      v-show="!isColorPickerHidden"
      class="colorpicker"
      @changeColor="updateColor"
    />

    <h1>Hi! I'm
      <span
        class="colorHighlight"
        :style="highlightStyle"
        @click="isColorPickerHidden = !isColorPickerHidden"
      >{{ name }}</span>
      <img
        v-show="isValidColor"
        src="src/assets/emoji_worked.png"
        alt="memoji happy"
      />
      <img
        v-show="!isValidColor"
        src="src/assets/emoji_not_working.png"
        alt="memoji sad"
      />
    </h1>
    <button
      class="button"
      :style="highlightStyle"
      @click="copyToClipboard"
    >
      Copy me
    </button>
  </div>
  <p class="notice">
    Press the <strong>colored box</strong> to change the color
  </p>
</template>

<script>
import { ColorPicker } from 'vue-color-kit';
import useClipboard from 'vue-clipboard3';
import chroma from 'chroma-js';
import 'vue-color-kit/dist/vue-color-kit.css';

export default {
  name: 'App',
  components: {
    ColorPicker,
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
    copyValue() {
      return `$${this.camelize(this.name)}: ${this.color};`;
    },
    highlightStyle() {
      const isDark = chroma(this.color)
        .get('lab.l') < 70;
      return {
        backgroundColor: this.color,
        color: isDark ? 'white' : 'inherit',
      };
    },
  },
  data() {
    return {
      color: '#EEEEEE',
      name: '',
      isValidColor: false,
      isColorPickerHidden: true,
    };
  },
  watch: {
    color() {
      this.fetchColorName();
    },
  },
  methods: {
    async fetchColorName() {
      if (this.isColorPickerHidden) {
        const strippedColor = this.color.replace('#', '');
        const data = await fetch(`https://api.color.pizza/v1/${strippedColor}`)
          .then((response) => (response.status === 200 ? response.json() : false));

        if (data && this.color.length > 0) {
          this.name = data.colors[0].name;
          this.isValidColor = true;
        } else {
          this.name = 'not a valid color';
          this.isValidColor = false;
        }
      }
    },
    updateColor(data) {
      this.color = data.hex;
    },
    deactivateColorPicker() {
      if (!this.isColorPickerHidden) {
        this.isColorPickerHidden = true;
        this.fetchColorName();
      }
    },
    camelize(str) {
      return str.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => {
        if (p2) return p2.toUpperCase();
        return p1.toLowerCase();
      });
    },
    copyToClipboard() {
      const { toClipboard } = useClipboard();
      toClipboard(this.copyValue);
    },
  },
  mounted() {
    this.fetchColorName();
  },
};
</script>

<style lang="scss">
$yellow: #FEDF00;

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

.isActive {
  &:after {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(black, 60%);
    content: '';
    z-index: 50;
  }
}

.button {
  padding: .8rem 3rem;
  border: none;
  border-radius: 3rem;
  background-color: $yellow;
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

.center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
  background-color: $yellow;
  transition: all ease-in .2s,  width 0.25s;

  &:hover {
    cursor: pointer;
    background-color: darken($yellow, 2%);
    transform: scale(.99);
   }
}

img {
  margin-left: .4rem;
  height: 96px;
  width: auto;
}

.notice {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: #2c3e50;
}
</style>
