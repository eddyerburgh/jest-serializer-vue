// This is used to override the library defaults so the tests will run as expected

module.exports = {
  pluginOptions: {
    jestSerializer: {
      removeComments: true,
      stringifyObjects: true
    }
  }
};
