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
      <pre @click="isColorPickerHidden = !isColorPickerHidden">{{ name }}</pre>
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
  </div>
</template>

<script>
import { ColorPicker } from 'vue-color-kit';
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
  },
  data() {
    return {
      color: '#8db33c',
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
      console.log(1630657709719, this.isColorPickerHidden);
      if (this.isColorPickerHidden) {
        const strippedColor = this.color.replace('#', '');
        const data = await fetch(`https://api.color.pizza/v1/${strippedColor}`)
          .then((response) => (response.status === 200 ? response.json() : false));

        console.log(1630601571129, data);

        if (data && this.color.length > 0) {
          this.name = data.colors[0].name;
          this.isValidColor = true;
        } else {
          this.name = 'not a valid color';
          this.isValidColor = false;
        }
      }
    },
    updateColor(color) {
      console.log(1630654717546, 'test');
      console.log(1630654680509, color);
      this.color = color.hex;
    },
    deactivateColorPicker() {
      console.log(1630656948611, 'true');
      if (!this.isColorPickerHidden) {
        this.isColorPickerHidden = true;
        this.fetchColorName();
      }
    },
  },
  mounted() {
    this.fetchColorName();
  },
};
</script>

<style lang="scss">

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

.colorpicker {
  position: absolute;
  z-index: 100;
}

input {
  padding: 15px 40px;
  border-radius: 8px;
  border: none;
  background-color: lightgrey;
  font-weight: bold;
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
}

pre {
  margin: 0 0 0 1.5rem;
  display: inline-block;
  position: relative;
  padding: 5px 25px;
  background-color: #FEDF00;

  &:hover {
    cursor: pointer;
   }
}

img {
  margin-left: .4rem;
  height: 96px;
  width: auto;
}
</style>
