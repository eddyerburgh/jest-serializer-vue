import { shallowMount } from '@vue/test-utils';
import ObjectAttribute from './components/ObjectAttribute.vue';

describe('ObjectAttribute.vue', () => {
  test('Snapshot unchanged', () => {
    const wrapper = shallowMount(ObjectAttribute);

    expect(wrapper)
      .toMatchSnapshot();
  });
});
