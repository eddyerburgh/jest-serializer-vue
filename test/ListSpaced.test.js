import { shallowMount } from '@vue/test-utils';
import ListSpaced from './components/ListSpaced.vue';

describe('ListSpaced.vue', () => {
  test('Snapshot unchanged', () => {
    const wrapper = shallowMount(ListSpaced);

    expect(wrapper.html())
      .toMatchSnapshot();
  });
});
