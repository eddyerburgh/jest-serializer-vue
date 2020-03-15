const path = require('path');

const helpers = {
  mockSettings: function (settings) {
    jest.doMock(path.join(__dirname, '..', 'vue.config.js'), function () {
      return {
        pluginOptions: {
          jestSerializer: settings
        }
      };
    });
  }
};

module.exports = helpers;
