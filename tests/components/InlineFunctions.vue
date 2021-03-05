<template>
  <div>
    <h1 :title="function () { return true; }">Classic</h1>
    <h2
      :title="function () {
        return true;
      }"
    >Multi-line</h2>
    <h3 :title="(x) => !x">Arrow</h3>
    <h4 :title="method">Reference</h4>
    <h5 :title="method()">Run</h5>
    <h6 title="function (a word used in programming) is typically followed by curly braces, ie {}">Red herring</h6>
  </div>
</template>

<script>
export default {
  name: 'InlineFunctions',
  methods: {
    method: function () {
      return 2;
    }
  }
};
</script>
