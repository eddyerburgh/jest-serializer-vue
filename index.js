const beautify = require('js-beautify').html;
const fs = require('fs');
const _cloneDeep = require('lodash.clonedeep');

const helpers = require('./src/helpers.js');
const loadOptions = require('./src/loadOptions.js');
const stringManipulation = require('./src/stringManipulation.js');
const vnodeManipulation = require('./src/vnodeManipulation.js');

module.exports = {
  /**
   * Test function for Jest's serializer API.
   * Determines whether to pass the markup through the print function.
   *
   * @param  {string|object} received  The markup or Vue wrapper to be formatted
   * @return {boolean}                 true = Tells Jest to run the print function
   */
  test: function (received) {
    return helpers.isHtmlString(received) || helpers.isVueWrapper(received);
  },
  /**
   * Print function for Jest's serializer API.
   * Formats markup according to options.
   *
   * @param  {string|object} received  The markup or Vue wrapper to be formatted
   * @return {string}                  The formatted markup
   */
  print: function (received) {
    const options = loadOptions(fs);

    let html = received || '';
    html = vnodeManipulation(html, options, _cloneDeep);
    html = stringManipulation(html, options);

    // Format markup
    return beautify(html, options.formatting);
  }
};
