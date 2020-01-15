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
          label: 'Age',
          field: 'age'
        }
      ],
      rows: [
        {
          id: 1,
          name: 'Dave',
          age: 15
        }
      ]
    };
  }
};
</script>
