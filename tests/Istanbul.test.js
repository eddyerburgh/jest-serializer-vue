const helpers = require('./helpers.js');

import { mount } from '@vue/test-utils';
import Istanbul from './components/Istanbul.vue';

describe('Istanbul.vue', () => {
  test('Comment removed', () => {
    helpers.mockSettings({
      removeIstanbulComments: true
    });
    let wrapper = mount(Istanbul);

    expect(wrapper)
      .toMatchSnapshot();
  });
});
