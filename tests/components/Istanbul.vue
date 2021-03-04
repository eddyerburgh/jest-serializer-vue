<template>
  <div :title="function () { return true; }">
    <section>
      <article class="alright">
        <aside>
          <h1 class="okay">okay</h1>
          <fieldset>
            <form>
              <label
                for="text"
                :stuff="(x) => !x"
              >
                Text
              </label>
              <input
                id="text"
                :aria-label="'text'"
                :aria-required="true"
                requried
                :thing="random"
              />
            </form>
          </fieldset>
        </aside>
      </article>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Istanbul',
  methods: {
    random: function () {
      let number = Math.random() * 10;
      number = Math.round(number);
      return number;
    }
  },
  created: function () {
    this.random();
  }
};
</script>
