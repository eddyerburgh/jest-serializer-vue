<template>
  <div>
    <h1 id="kitten" class="meow nyan" title="cat">
      fluffy
    </h1>
    <h2 id="kitten2" class="" :asdf="qwer">
      mittens
    </h2>
    <h3 id asdf data-test="qwer">
      scruffy
    </h3>
  </div>
</template>

<script>
export default {
  name: 'SortAttributes',
  data: function () {
    return {
      qwer: 'qwer'
    };
  }
};
</script>
