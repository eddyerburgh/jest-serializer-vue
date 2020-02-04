<template>
  <div>
    <!-- outer comment -->
    <svg data-test="svg" height="156">
      <desc>Example Triangle</desc>
      <!-- A triangle! -->
      <!-- eslint-disable-next-line vue/html-self-closing -->
      <path
        d="M 10,150 L 70,10 L 130,150 z"
        fill="#D5D8CB"
        stroke="#ECDCC6"
        stroke-width="6"
      ></path>
    </svg>

    <svg
      width="100%"
      height="80px"
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 100 100 L 300 100 L 200 300 z"
        fill="LightBlue"
        stroke="Blue"
        stroke-width="3"
      />
    </svg>
    <!-- trailing comment -->
  </div>
</template>

<script>
export default {
  name: 'SvgDemo'
};
</script>
