<template>
  <div>
    <h1 :title="function () { return true; }">Classic</h1>
    <h2
      :title="function named () {
        return true;
      }"
    >Multi-line</h2>
    <h3 :title="(x) => !x">Arrow 1</h3>
    <h3 :title="x => !x">Arrow 2</h3>
    <h3 :title="() => true">Arrow 3</h3>
    <h3 :title="(x, y) => { return x + y; }">Arrow 4</h3>
    <h4 :title="method">Reference</h4>
    <h5 :title="method()">Run</h5>
    <h6 title="function (a word used in programming) is typically followed by curly braces, ie {}">Red herring</h6>
    <div>
      <pre>
        function notInAnAttribute (a, b, c) {
          const d = a * c;
          const e = d - b;
          return e;
        }
      </pre>
    </div>
    <div title="this is what a it looks like function () {}">
      Attribute does not start with function.
    </div>
    <div title="function () {} is what it looks like">
      Attribute does not end with }.
    </div>
    <p :title="[method, method]">In array</p>
    <footer :title="propFn">Default function in in a prop</footer>
  </div>
</template>

<script>
export default {
  name: 'InlineFunctions',
  props: {
    propFn: {
      type: Function,
      default: function () {
        return () => ({});
      }
    }
  },
  methods: {
    method: function () {
      return 2;
    }
  }
};
</script>
