const helpers = require('./helpers.js');

import { shallowMount } from '@vue/test-utils';
import InputValue from './components/InputValue.vue';

describe('InputValue.vue', () => {
  test('Value shown in snapshot', () => {
    helpers.mockSettings({ addInputValues: true });

    const wrapper = shallowMount(InputValue);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Value not shown in snapshot', () => {
    helpers.mockSettings({ addInputValues: false });

    const wrapper = shallowMount(InputValue);

    expect(wrapper)
      .toMatchSnapshot();
  });
});
