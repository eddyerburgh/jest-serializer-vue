const helpers = require('./helpers.js');

import { shallowMount } from '@vue/test-utils';
import AttributesToClear from './components/AttributesToClear.vue';

describe('AttributesToClear.vue', () => {
  test('Default snapshot', () => {
    helpers.mockSettings({ removeDataTest: false });

    const wrapper = shallowMount(AttributesToClear);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Just ID cleared', () => {
    helpers.mockSettings({
      removeDataTest: false,
      attributesToClear: ['id']
    });

    const wrapper = shallowMount(AttributesToClear);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('All attributes cleared', () => {
    helpers.mockSettings({
      removeDataTest: false,
      attributesToClear: [
        'id',
        'class',
        'title',
        'asdf',
        'data-test ',
        ' some junk ',
        true
      ]
    });

    const wrapper = shallowMount(AttributesToClear);

    expect(wrapper)
      .toMatchSnapshot();
  });
});
