const JSDOM = require('jsdom').JSDOM;

/**
 * Removes any data-* attribute passed in.
 *
 * @param  {object} dom        The markup as a JSDOM node.
 * @param  {string} attribute  The attribute suffix.
 */
function removeDataAttribute (dom, attribute) {
  let elements = dom.window.document.querySelectorAll('[data-' + attribute + ']');
  elements.forEach(function (element) {
    element.removeAttribute('data-' + attribute);
  });
}

/**
 * Removes ID attributes from elements where the id starts with `test`.
 *
 * @param  {object} dom      The markup as a JSDOM node.
 * @param  {object} options  User options
 */
function removeIdTest (dom, options) {
  if (options && options.removeIdTest) {
    const elements = dom.window.document.querySelectorAll('[id]');
    elements.forEach(function (element) {
      if (element.attributes.id.value.startsWith('test')) {
        element.removeAttribute('id');
      }
    });
  }
}

/**
 * Removes classes from elements where the class starts with `test`.
 *
 * @param  {object} dom      The markup as a JSDOM node.
 * @param  {object} options  User options
 */
function removeClassTest (dom, options) {
  if (options && options.removeClassTest) {
    const elements = dom.window.document.querySelectorAll('[class]');
    elements.forEach(function (element) {
      const classes = element.classList;
      let classesToRemove = [];

      classes.forEach(function (className) {
        if (className.startsWith('test')) {
          classesToRemove.push(className);
        }
      });

      // If a element has 3 or more classes that need removed,
      // then removing them in the above loop would mess up the index
      // as we are looping, skipping classes. There is a test in place
      // for that edge case. That's why we build a temp list of
      // classes to remove and then loop over it.
      classesToRemove.forEach(function (className) {
        element.classList.remove(className);
      });

      // Only remove the empty class attributes on elements that had test-classes.
      // There is a test case for this.
      if (!element.classList.length && classesToRemove.length) {
        element.removeAttribute('class');
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
 * @param  {string} html     The markup being serialized
 * @param  {object} options  Options object for this serializer
 * @return {string}          Modified HTML string
 */
function removeTestTokens (html, options) {
  const dom = new JSDOM(html);

  if (!options || options.removeDataTest) {
    removeDataAttribute(dom, 'test');
  }
  if (!options || options.removeDataTestid) {
    removeDataAttribute(dom, 'testid');
  }
  if (!options || options.removeDataTestId) {
    removeDataAttribute(dom, 'test-id');
  }
  if (options && options.removeDataQa) {
    removeDataAttribute(dom, 'qa');
  }

  removeIdTest(dom, options);
  removeClassTest(dom, options);

  html = dom.window.document.body.innerHTML;
  return html;
}

module.exports = removeTestTokens;
