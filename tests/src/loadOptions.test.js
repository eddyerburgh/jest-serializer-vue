const path = require('path');

const loadOptions = require('../../src/loadOptions.js');

describe('loadOptions.js', () => {
  test('Vue config does not exist', () => {
    const fs = {
      existsSync: jest.fn(() => {
        return false;
      })
    };
    const file = path.join(process.cwd(), 'vue.config.js');

    const options = loadOptions(fs);

    expect(fs.existsSync)
      .toHaveBeenCalledWith(file);

    expect(options)
      .toMatchSnapshot();
  });
});
