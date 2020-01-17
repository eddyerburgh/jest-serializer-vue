<template>
  <div v-if="number > 0">
    <span>{{ number }}</span>
    <Recursive :number="number + - 1" />
    <Recursive :number="number + - 1" />
  </div>
</template>

<script>
import Recursive from './Recursive.vue';

export default {
  name: 'Recursive',
  components: {
    Recursive
  },
  props: {
    number: {
      type: Number,
      required: false,
      default: 0
    }
  }
};
</script>
