<template>
  <form>
    <input value="Native value with attribute" title="text" />
    <input value="Native value without attribute" />
    <input value="Native checkbox" type="checkbox" />

    <input v-model="hasAttributes" title="text" />
    <input v-model="noAttributes" />

    <input v-model="array" />
    <input v-model="booleanOff" />
    <input v-model="booleanOn" />
    <input v-model="err" />
    <input v-model="date" type="date" />
    <input v-model="invalidDate" type="date" />
    <input v-model="infinity" />
    <input v-model="negativeInfinity" />
    <input v-model="nan" />
    <input v-model="nuller" />
    <input v-model.number="number" type="range" />
    <input v-model="object" />
    <input v-model="set" />
    <input v-model="string" type="checkbox" />
    <input v-model="stringType" />
    <input v-model="symbolic" />
    <input v-model="undefiner" />

    <textarea v-model="textarea"></textarea>

    <input v-model="pet" type="radio" value="cat" />
    <input v-model="pet" type="radio" value="dog" />

    <select v-model="vegetable">
      <option v-text="Carrot" value="carrot"></option>
      <option v-text="Celery" value="celery"></option>
    </select>
  </form>
</template>

<script>
export default {
  name: 'InputValue',
  data: function () {
    return {
      hasAttributes: 'There is a title attribute on this input',
      noAttributes: 'There are no other attrubutes on this input',
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
      symbolic: Symbol('a'),
      undefiner: undefined,
      textarea: 'Text\nText',
      pet: 'dog',
      vegetable: 'celery'
    };
  }
};
</script>
