const helpers = require('./helpers.js');

import { mount } from '@vue/test-utils';
import Recursive from './components/Recursive.vue';

/*
  Set this to 15 or higher with wrapper (not .html())
  to exceed the stack overflow caused by deep cloning.
*/

describe('Recursive.vue', () => {
  test('Snapshots unchanged', () => {
    helpers.mockSettings({
      stringifyObjects: true
    });

    const wrapper = mount(Recursive, {
      propsData: {
        number: 3
      }
    });

    expect(wrapper)
      .toMatchSnapshot('Wrapper');

    expect(wrapper.html())
      .toMatchSnapshot('Wrapper.html()');
  });
});
