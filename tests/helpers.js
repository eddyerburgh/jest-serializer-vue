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
  },
  mockManifest: function (settings) {
    jest.doMock(path.join(__dirname, '..', 'package.json'), function () {
      return {
        jestSerializer: settings
      };
    });
  }
};

module.exports = helpers;
