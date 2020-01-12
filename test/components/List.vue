<template>
  <ul>
    <li
      v-for="(item, key) in items"
      :key="key"
    >
      {{ item }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'List',
  props: {
    items: {
      type: Array,
      default: function () {
        return [];
      }
    }
  }
};
</script>
