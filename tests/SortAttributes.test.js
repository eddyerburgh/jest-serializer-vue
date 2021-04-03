const helpers = require('./helpers.js');

import { shallowMount } from '@vue/test-utils';
import SortAttributes from './components/SortAttributes.vue';

describe('SortAttributes.vue', () => {
  test('Sorted', () => {
    helpers.mockSettings({ sortAttributes: true });

    const wrapper = shallowMount(SortAttributes);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Unsorted', () => {
    helpers.mockSettings({ sortAttributes: false });

    const wrapper = shallowMount(SortAttributes);

    expect(wrapper)
      .toMatchSnapshot();
  });
});
