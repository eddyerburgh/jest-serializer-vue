import { shallowMount } from '@vue/test-utils';
import DataTestIds from './components/DataTestIds.vue';

describe('DataTestIds.vue', () => {
  test('Snapshot unchanged', () => {
    const wrapper = shallowMount(DataTestIds);

    expect(wrapper.html())
      .toMatchSnapshot();
  });
});
