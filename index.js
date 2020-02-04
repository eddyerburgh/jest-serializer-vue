const beautify = require('js-beautify').html;
const fs = require('fs');

const helpers = require('./src/helpers.js');
const loadOptions = require('./src/loadOptions.js');
const replaceObjectObject = require('./src/replaceObjectObject.js');
const removeTestTokens = require('./src/removeTestTokens.js');

/**
 * Determines if the passed in value is markup.
 *
 * @param  {string}  received  The markup to be serialized
 * @return {boolean}           true = value is HTML
 */
function isHtmlString (received) {
  return (
    received &&
    typeof(received) === 'string' &&
    received.startsWith('<')
  );
}

/**
 * Determines if the passed in value is a Vue wrapper.
 *
 * @param  {object}  received  The Vue wrapper containing the markup to be serialized
 * @return {boolean}           true = value is a Vue wrapper
 */
function isVueWrapper (received) {
  return (
    received &&
    typeof(received) === 'object' &&
    typeof(received.isVueInstance) === 'function'
  );
}

/**
 * This removes the data-server-rendered="true" from your snapshots.
 *
 * @param  {string} html     The markup being serialized
 * @param  {object} options  Options object for this serializer
 * @return {string}          Modified HTML string
 */
function removeServerRenderedText (html, options) {
  if (!options || options.removeServerRendered) {
    const $ = helpers.$(html);

    $('[data-server-rendered]').removeAttr('data-server-rendered');

    return $.html();
  }
  return html;
}

/**
 * This removes data-v-1234abcd="" from your snapshots.
 *
 * @param  {string} html     The markup being serialized
 * @param  {object} options  Options object for this serializer
 * @return {string}          Modified HTML string
 */
function removeScopedStylesDataVIDAttributes (html, options) {
  if (!options || options.removeDataVId) {
    // [-\w]+ will catch 1 or more instaces of a-z, A-Z, 0-9, hyphen (-), or underscore (_)
    const regexA = / data-v-[-\w]+=""/g;
    const regexB = / data-v-[-\w]+/g;

    // [[' data-v-asdf=""'], [' data-v-qwer=""'], [' data-v-asdf=""']]
    let dataVIdsA = Array.from(html.matchAll(regexA));
    // [[' data-v-asdf'], [' data-v-qwer'], [' data-v-asdf']]
    let dataVIdsB = Array.from(html.matchAll(regexB));
    // [...dataVIdsA, ...dataVIdsB]
    let dataVIds = [].concat(dataVIdsA, dataVIdsB);
    // ['data-v-asdf', 'data-v-qwer', 'data-v-asdf']
    dataVIds = dataVIds.map(function (match) {
      return match[0].trim().replace('=""', '');
    });
    // ['data-v-asdf', 'data-v-qwer']
    dataVIds = Array.from(new Set(dataVIds));

    const $ = helpers.$(html);
    dataVIds.forEach(function (attribute) {
      $('[' + attribute + ']').removeAttr(attribute);
    });

    html = $.html();
  }
  return html;
}

/**
 * This removes all HTML comments from your snapshots.
 * Normal <!---->
 * Multi-line <!-- \n asdf \n asdf \n -->
 * Containing HTML <!-- <div></div> -->
 *
 * @param  {string} html     The markup being serialized
 * @param  {object} options  Options object for this serializer
 * @return {string}          Modified HTML string
 */
function removeAllComments (html, options) {
  if (options && options.removeComments) {
    // The best Stackoverflow has to offer.
    // Also removes a trailing newline if it exists.
    return html.replace(/(?=<!--)([\s\S]*?)-->(\n)?/g, '');
  }
  return html;
}

module.exports = {
  /**
   * Test function for Jest's serializer API.
   * Determines whether to pass the markup through the print function.
   *
   * @param  {string|object} received  The markup or Vue wrapper to be formatted
   * @return {boolean}                 true = Tells Jest to run the print function
   */
  test: function (received) {
    return isHtmlString(received) || isVueWrapper(received);
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
    if (isVueWrapper(received)) {
      html = replaceObjectObject(received, options) || '';
    }
    html = removeServerRenderedText(html, options);
    html = removeTestTokens(html, options);
    html = removeScopedStylesDataVIDAttributes(html, options);
    html = removeAllComments(html, options);

    return beautify(html, options.formatting);
  }
};
