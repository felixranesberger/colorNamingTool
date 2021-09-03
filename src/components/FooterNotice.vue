<template>
  <p class="notice">
    Press the <strong>colored box</strong> to change the color
  </p>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FooterNotice',
});
</script>

<style lang="scss">

.notice {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: #2c3e50;
}
</style>
