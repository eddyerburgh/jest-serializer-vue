/**
 * Removes any data-* attribute passed in.
 *
 * @param  {object} $          The markup as a Cheerio DOM node.
 * @param  {string} attribute  The attribute suffix.
 */
function removeDataAttribute ($, attribute) {
  $('[data-' + attribute + ']').removeAttr('data-' + attribute);
}

/**
 * Removes ID attributes from elements where the id starts with `test`.
 *
 * @param  {object} $        The markup as a Cheerio DOM node.
 * @param  {object} options  User options
 */
function removeIdTest ($, options) {
  if (options && options.removeIdTest) {
    $('[id]').each(function (index, element) {
      if ($(element).attr('id').startsWith('test')) {
        $(element).removeAttr('id');
      }
    });
  }
}

/**
 * Removes classes from elements where the class starts with `test`.
 *
 * @param  {object} $        The markup as a Cheerio DOM node.
 * @param  {object} options  User options
 */
function removeClassTest ($, options) {
  if (options && options.removeClassTest) {
    $('[class]').each(function (index, element) {
      let classesWereRemoved = false;
      $(element).removeClass(function (index, css) {
        return css
          .split(' ')
          .filter(function (className) {
            if (className.toLowerCase().startsWith('test')) {
              classesWereRemoved = true;
              return true;
            }
            return false;
          })
          .join(' ');
      });

      // Only remove the empty class attributes on elements that had test-classes.
      // There is a test case for this.
      if (!$(element).attr('class') && classesWereRemoved) {
        $(element).removeAttr('class');
      }
    });
  }
}

/**
 * This removes the following from your snapshots:
 * data-test="whatever"
 * data-testid="whatever"
 * data-test-id="whatever"
 * data-qa="whatever"
 * id="testWhatever"
 * class="test-whatever"
 *
 * If you also want to remove them from your production builds, see:
 * https://forum.vuejs.org/t/how-to-remove-attributes-from-tags-inside-vue-components/24138
 *
 * @param  {object} $        The markup as a cheerio object
 * @param  {object} options  Options object for this serializer
 */
function removeTestTokens ($, options) {
  if (!options || options.removeDataTest) {
    removeDataAttribute($, 'test');
  }
  if (!options || options.removeDataTestid) {
    removeDataAttribute($, 'testid');
  }
  if (!options || options.removeDataTestId) {
    removeDataAttribute($, 'test-id');
  }
  if (options && options.removeDataQa) {
    removeDataAttribute($, 'qa');
  }
  if (options && options.removeDataCy) {
    removeDataAttribute($, 'cy');
  }

  removeIdTest($, options);
  removeClassTest($, options);
}

module.exports = removeTestTokens;
