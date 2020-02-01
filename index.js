const pretty = require('pretty');
const JSDOM = require('jsdom').JSDOM;

const loadOptions = require('./src/loadOptions.js');
const replaceObjectObject = require('./src/replaceObjectObject.js');

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
    const dom = new JSDOM(html);

    let elements = dom.window.document.querySelectorAll('[data-server-rendered]');
    elements.forEach(function (element) {
      element.removeAttribute('data-server-rendered');
    });

    return dom.window.document.body.innerHTML;
  }
  return html;
}

/**
 * This removes the following from your snapshots:
 * data-test="whatever"
 * data-testid="whatever"
 * data-test-id="whatever"
 * data-qa="whatever"
 *
 * If you also want to remove them from your production builds, see:
 * https://forum.vuejs.org/t/how-to-remove-attributes-from-tags-inside-vue-components/24138
 *
 * @param  {string} html     The markup being serialized
 * @param  {object} options  Options object for this serializer
 * @return {string}          Modified HTML string
 */
function removeTestTokens (html, options) {
  const dom = new JSDOM(html);

  if (!options || options.removeDataTest) {
    let elements = dom.window.document.querySelectorAll('[data-test]');
    elements.forEach(function (element) {
      element.removeAttribute('data-test');
    });
  }
  if (!options || options.removeDataTestid) {
    let elements = dom.window.document.querySelectorAll('[data-testid]');
    elements.forEach(function (element) {
      element.removeAttribute('data-testid');
    });
  }
  if (!options || options.removeDataTestId) {
    let elements = dom.window.document.querySelectorAll('[data-test-id]');
    elements.forEach(function (element) {
      element.removeAttribute('data-test-id');
    });
  }
  if (options && options.removeDataQa) {
    let elements = dom.window.document.querySelectorAll('[data-qa]');
    elements.forEach(function (element) {
      element.removeAttribute('data-qa');
    });
  }
  if (options && options.removeIdTest) {
    const elements = dom.window.document.querySelectorAll('[id]');
    elements.forEach(function (element) {
      if (element.attributes.id.value.startsWith('test')) {
        element.removeAttribute('id');
      }
    });
  }

  html = dom.window.document.body.innerHTML;
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
    return html.replace(/ data-v-[-\w]+=""/g, '');
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
    const options = loadOptions();

    let html = received || '';
    if (isVueWrapper(received)) {
      html = replaceObjectObject(received, options) || '';
    }
    html = removeServerRenderedText(html, options);
    html = removeTestTokens(html, options);
    html = removeScopedStylesDataVIDAttributes(html, options);
    html = removeAllComments(html, options);

    return pretty(html, options.pretty);
  }
};
