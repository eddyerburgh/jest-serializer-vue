<template>
  <ul>
    <li
      v-for="(item, key) in items"
      :key="'item' + key"
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
