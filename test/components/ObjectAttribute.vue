<template>
  <div :title="first">
    <h1 :title="['asdf', 'qwer']">
      text
    </h1>
  </div>
</template>

<script>
export default {
  name: 'ObjectAttribute',
  data: function () {
    return {
      first: {
        a: true,
        b: 'Some \"text\"',
        c: {
          d: {
            e: '23'
          },
          f: '\"\'\"\''
        }
      }
    };
  }
};
</script>
