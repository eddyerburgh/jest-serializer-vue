const helpers = require('./helpers.js');
const removeTestTokens = require('./removeTestTokens.js');

/**
 * This removes the data-server-rendered="true" from your snapshots.
 *
 * @param  {object} $        The markup as a cheerio object
 * @param  {object} options  Options object for this serializer
 */
function removeServerRenderedText ($, options) {
  if (!options || options.removeServerRendered) {
    $('[data-server-rendered]').removeAttr('data-server-rendered');
  }
}

/**
 * This removes data-v-1234abcd="" from your snapshots.
 *
 * @param  {object} $        The markup as a cheerio object
 * @param  {object} options  Options object for this serializer
 */
function removeScopedStylesDataVIDAttributes ($, options) {
  if (!options || options.removeDataVId) {
    // [-\w]+ will catch 1 or more instaces of a-z, A-Z, 0-9, hyphen (-), or underscore (_)
    const regex = / data-v-[-\w]+/g;

    // [' data-v-asdf=""', ' data-v-qwer', ' data-v-asdf']
    let dataVIds = $.html().match(regex) || [];
    // ['data-v-asdf', 'data-v-qwer', 'data-v-asdf']
    dataVIds = dataVIds.map(function (match) {
      return match.trim().replace('=""', '');
    });
    // ['data-v-asdf', 'data-v-qwer']
    dataVIds = Array.from(new Set(dataVIds));

    dataVIds.forEach(function (attribute) {
      $('[' + attribute + ']').removeAttr(attribute);
    });
  }
}

/**
 * Loops over the attributesToClear array to set the attribute
 * value to empty string on all matching elements.
 *
 * @param  {object} $        The markup as a cheerio object
 * @param  {object} options  Options object for this serializer
 */
function clearAttributes ($, options) {
  if (
    options &&
    options.attributesToClear &&
    options.attributesToClear.length
  ) {
    options.attributesToClear.forEach(function (attribute) {
      $('[' + attribute + ']').attr(attribute, '');
    });
  }
}

/**
 * Replaces inline functions with the '[function]' placeholder.
 *
 * @param  {object} $        The markup as a cheerio object
 * @param  {object} options  Options object for this serializer
 */
function clearInlineFunctions ($, options) {
  if (options && options.clearInlineFunctions) {
    $('*').each(function (index, element) {
      Object.keys(element.attribs).forEach(function (attributeName) {
        let value = element.attribs[attributeName];
        if (helpers.isFunctionDeclaration(value)) {
          element.attribs[attributeName] = '[function]';
        }
      });
    });
  }
}

/**
 * Inline functions get weird istanbul coverage comments.
 * This removes them.
 * <div title="function () {
 *   /* istanbul ignore next *\/
 *   cov_1lmjj6lxv1.f[3]++;
 *   cov_1lmjj6lxv1.s[15]++;
 *   return true;
 * }">
 *
 * @param  {object} $        The markup as a cheerio object
 * @param  {object} options  Options object for this serializer
 */
function removeIstanbulComments ($, options) {
  if (
    options &&
    options.removeIstanbulComments &&
    $.html().includes('/* istanbul')
  ) {
    $('*').each(function (index, element) {
      Object.keys(element.attribs).forEach(function (attributeName) {
        let value = element.attribs[attributeName];
        if (value.includes('/* istanbul')) {
          value = value.split('\n').filter(function (line) {
            return (
              !line.trim().startsWith('/* istanbul') &&
              !line.trim().startsWith('cov_')
            );
          });
          element.attribs[attributeName] = value.join('\n');
        }
      });
    });
  }
}

/**
 * Sorts the attributes of all HTML elements to make diffs easier to read.
 *
 * <div id="dog" class="cat bat"><h1 title="a" class="b">Text</h1></div>
 * <div class="cat bat" id="dog"><h1 class="b" title="a">Text</h1></div>
 *
 * @param  {object} $        The markup as a cheerio object
 * @param  {object} options  Options object for this serializer
 */
function sortAttributes ($, options) {
  if (
    options &&
    options.sortAttributes
  ) {
    $('*').each(function (index, element) {
      Object.keys(element.attribs).sort().forEach(function (key) {
        let value = element.attribs[key];
        delete element.attribs[key];
        element.attribs[key] = value;
      });
    });
  }
}

/**
 * Performs all string manipulations on the rendered DOM
 * prior to formatting. Using Cheerio for DOM manipulation.
 *
 * @param  {string} html     The markup being serialized
 * @param  {object} options  Options object for this serializer
 * @return {string}          The markup being serialized
 */
function cheerioManipulation (html, options) {
  let $ = helpers.$(html);

  removeServerRenderedText($, options);
  removeTestTokens($, options);
  removeScopedStylesDataVIDAttributes($, options);
  clearAttributes($, options);

  // clearInlineFunctions should always be ran before removeIstanbulComments for speed
  clearInlineFunctions($, options);
  removeIstanbulComments($, options);
  sortAttributes($, options);

  return $.html();
}

module.exports = cheerioManipulation;
