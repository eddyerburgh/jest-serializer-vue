const path = require('path');

const loadOptions = require('../../src/loadOptions.js');
const helpers = require('../../src/helpers.js');
const testHelpers = require('../helpers.js');

describe('loadOptions.js', () => {
  test('Vue config and package.json does not exist', () => {
    const fs = {
      existsSync: jest.fn(() => {
        return false;
      })
    };

    const options = loadOptions(fs);

    expect(fs.existsSync)
      .toHaveBeenCalledWith(path.join(process.cwd(), 'package.json'));

    expect(fs.existsSync)
      .toHaveBeenCalledWith(path.join(process.cwd(), 'vue.config.js'));

    expect(options)
      .toEqual(helpers.defaultSettings());
  });

  test('Manifest is loaded', () => {
    testHelpers.mockManifest({});

    const fs = {
      existsSync: jest.fn(() => {
        return true;
      })
    };

    const options = loadOptions(fs);

    expect(fs.existsSync)
      .toHaveBeenCalledWith(path.join(process.cwd(), 'package.json'));

    expect(fs.existsSync)
      .not.toHaveBeenCalledWith(path.join(process.cwd(), 'vue.config.js'));

    expect(options)
      .toEqual(helpers.defaultSettings());
  });
});
