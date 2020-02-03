const helpers = require('./helpers.js');

import { shallowMount } from '@vue/test-utils';
import ListSpaced from './components/ListSpaced.vue';

describe('ListSpaced.vue', () => {
  test('Snapshot unchanged', () => {
    helpers.mockSettings({});
    const wrapper = shallowMount(ListSpaced);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Default formatting options', () => {
    helpers.mockSettings({
      formatting: {}
    });
    const wrapper = shallowMount(ListSpaced);

    expect(wrapper)
      .toMatchSnapshot();
  });
});
