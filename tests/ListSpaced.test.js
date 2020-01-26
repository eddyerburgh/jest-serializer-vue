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

  test('Default pretty options', () => {
    helpers.mockSettings({
      pretty: true
    });
    const wrapper = shallowMount(ListSpaced);

    expect(wrapper)
      .toMatchSnapshot();
  });
});
