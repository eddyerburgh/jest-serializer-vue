const helpers = {
  mockSettings: function (settings) {
    jest.doMock('../vue.config.js', function () {
      return {
        pluginOptions: {
          jestSerializer: settings
        }
      };
    });
  }
};

module.exports = helpers;
