const helpers = require('./helpers.js');

import { mount } from '@vue/test-utils';
import SvgDemo from './components/SvgDemo.vue';

describe('SvgDemo.vue', () => {
  test('SVG renders properly', () => {
    helpers.mockSettings({});
    const wrapper = mount(SvgDemo);

    expect(wrapper)
      .toMatchSnapshot();
  });
});
