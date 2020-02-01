<template>
  <div>
    <VueGoodTable
      :columns="columns"
      :rows="rows"
    />
  </div>
</template>

<script>
import { VueGoodTable } from 'vue-good-table';

export default {
  name: 'ScopedStylesInDependency',
  components: {
    VueGoodTable
  },
  data: function () {
    return {
      columns: [
        {
          label: 'Name',
          field: 'name'
        },
        {
          label: 'Favorite data-v-id=""',
          field: 'favorite'
        }
      ],
      rows: [
        {
          id: 1,
          name: 'Dave',
          favorite: 'data-v-13ae5fa3=""'
        }
      ]
    };
  }
};
</script>
