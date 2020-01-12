import { shallowMount } from '@vue/test-utils';
import List from './components/List.vue';

describe('List.vue', () => {
  test('Snapshot unchanged', () => {
    const wrapper = shallowMount(List, {
      propsData: {
        items: ['one', 'two', 'three']
      }
    });

    expect(wrapper.html())
      .toMatchSnapshot();
  });
});
