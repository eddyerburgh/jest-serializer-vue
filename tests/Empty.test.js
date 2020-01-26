const helpers = require('./helpers.js');

import { mount, shallowMount } from '@vue/test-utils';
import Empty from './components/Empty.vue';

describe('Empty.vue', () => {
  beforeEach(() => {
    helpers.mockSettings({});
  });

  test('Properly serializes a shallowly-rendered wrapper', () => {
    const wrapper = shallowMount(Empty);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Properly serializes a fully-mounted wrapper', () => {
    const wrapper = mount(Empty);

    expect(wrapper)
      .toMatchSnapshot();
  });
});
