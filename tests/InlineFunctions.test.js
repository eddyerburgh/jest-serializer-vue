const helpers = require('./helpers.js');

import { mount } from '@vue/test-utils';
import InlineFunctions from './components/InlineFunctions.vue';

describe('InlineFunctions.vue', () => {
  test('Functions kept', () => {
    helpers.mockSettings({
      clearInlineFunctions: false
    });
    const wrapper = mount(InlineFunctions);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Functions removed', () => {
    helpers.mockSettings({
      clearInlineFunctions: true
    });
    const wrapper = mount(InlineFunctions);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Props', () => {
    const wrapper = mount(InlineFunctions);
    const propFn = wrapper.vm.propFn;
    const fn = propFn();

    expect(typeof(propFn))
      .toEqual('function');

    expect(typeof(fn))
      .toEqual('function');

    expect(fn())
      .toEqual({});
  });
});
