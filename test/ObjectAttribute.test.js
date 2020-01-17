import { shallowMount } from '@vue/test-utils';
import ObjectAttribute from './components/ObjectAttribute.vue';

describe('ObjectAttribute.vue', () => {
  test('Snapshots unchanged', () => {
    const wrapper = shallowMount(ObjectAttribute);

    expect(wrapper.html())
      .toMatchSnapshot('1 wrapper.html()');

    expect(wrapper)
      .toMatchSnapshot('2 wrapper');

    expect(wrapper.html())
      .toMatchSnapshot('3 wrapper.html()');

    expect(wrapper)
      .toMatchSnapshot('4 wrapper');

    expect(wrapper.find('[data-test="div"]').element.title)
      .toEqual('[object Object]');

    expect(wrapper.find('[data-test="h1"]').element.title)
      .toEqual('asdf,qwer');
  });
});
