<template>
  <transition name="fade">
    <container container-classes="alertwrapper" v-show="active">
      <p class="alert">{{ text }}</p>
    </container>
  </transition>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Alert',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '',
    },
  },
});
</script>

<style>
.alert {
  position: fixed;
  padding: 1rem 3rem;
  bottom: 5vh;
  left: 50%;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  background-color: white;
  border-radius: 10px;
  transform: translateX(-50%);
  font-size: 1.2rem;
  font-weight: bold;
  z-index: 999;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
