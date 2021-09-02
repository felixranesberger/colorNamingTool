<template>
  <div class="center">
    <input v-model="color" placeholder="edit me">

    <h1>Hi! I'm
      <pre>{{ name }}</pre>
    </h1>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      name: '',
      color: '123123',
    };
  },
  watch: {
    color() {
      this.fetchColorName();
    },
  },
  methods: {
    async fetchColorName() {
      const strippedColor = this.color.replace('#', '');
      const data = await fetch(`https://api.color.pizza/v1/${strippedColor}`)
        .then((response) => (response.status === 200 ? response.json() : false));

      console.log(1630601571129, data);

      const name = data
        ? data.colors[0].name
        : 'not a valid color 😇';

      console.log(1630601552991, name);

      this.name = name;
    },
  },
  mounted() {
    this.fetchColorName();
  },
};
</script>

<style>

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
  font-weight: bold;
  font-size: 70px;
}

pre {
  display: inline-block;
  padding: 5px 25px;
  background-color: #FEDF00;
}
</style>
