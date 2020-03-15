<template>
  <div v-if="dateMode">
    <hr :title="date" />
  </div>
  <div
    v-else
    :title="first"
    data-test="div"
  >
    <h1
      :title="['asdf', 'qwer']"
      class="active"
      data-test="h1"
    >
      text
    </h1>
    <hr :title="array" />
    <hr :title="booleanOff" />
    <hr :title="booleanOn" />
    <hr :title="invalidDate" />
    <hr :title="err" />
    <hr :title="infinity" />
    <hr :title="negativeInfinity" />
    <hr :title="nan" />
    <hr :title="nuller" />
    <hr :title="number" />
    <hr :title="object" />
    <hr :title="set" />
    <hr :title="string" />
    <hr :title="stringType" />
    <hr :title="undefiner" />
    <hr :title="textarea" />
  </div>
</template>

<script>
export default {
  name: 'ObjectAttribute',
  props: {
    dateMode: {
      type: Boolean,
      required: false,
      default: false
    }
  },
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
      },
      array: ['text', 22],
      booleanOff: false,
      booleanOn: true,
      date: new Date('2020'),
      invalidDate: new Date('asdf'),
      err: new Error('err'),
      infinity: Infinity,
      negativeInfinity: -Infinity,
      nan: NaN,
      nuller: null,
      number: 75,
      object: {
        a: {
          c: true
        },
        b: {
          d: 'text'
        }
      },
      set: new Set(['a', 'b', 'b', 'c']),
      string: 'Text',
      stringType: String,
      undefiner: undefined,
      textarea: 'Text\nText'
    };
  }
};
</script>
