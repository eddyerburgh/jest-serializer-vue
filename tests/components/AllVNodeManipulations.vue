<template>
  <div>
    <h1 :title="{ a: { b: 34 }, c: [[], 3, true] }">
      H1
    </h1>
    <input v-model="cow" />
  </div>
</template>

<script>
export default {
  name: 'AllVNodeManipulations',
  data: function () {
    return {
      cow: 'moo'
    };
  }
};
</script>
