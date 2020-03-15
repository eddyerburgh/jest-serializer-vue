const fs = require('fs');

const helpers = require('../helpers.js');
const loadOptions = require('../../src/loadOptions.js');
const vnodeManipulation = require('../../src/vnodeManipulation.js');

import { shallowMount } from '@vue/test-utils';

describe('VnodeManipulation', () => {
  test('Deep clone fails', () => {
    helpers.mockSettings({
      addInputValues: true,
      verbose: false
    });

    const options = loadOptions(fs);
    const wrapper = shallowMount({
      name: 'fail',
      template: '<div></div>'
    });

    /**
     * A mock of lodash.clonedeep
     */
    function deepFake () {
      throw new Error('Max callstack exceed, oh no');
    }

    expect(vnodeManipulation(wrapper, options, deepFake))
      .toMatchSnapshot();
  });
});
