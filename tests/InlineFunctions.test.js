const helpers = require('./helpers.js');

import { mount } from '@vue/test-utils';
import InlineFunctions from './components/InlineFunctions.vue';

describe('InlineFunctions.vue', () => {
  test('Functions kept', () => {
    helpers.mockSettings({
      clearInlineFunctions: false
    });
    let wrapper = mount(InlineFunctions);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Functions removed', () => {
    helpers.mockSettings({
      clearInlineFunctions: true
    });
    let wrapper = mount(InlineFunctions);

    expect(wrapper)
      .toMatchSnapshot();
  });
});
