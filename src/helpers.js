const cheerio = require('cheerio');
const htmlparser2 = require('htmlparser2');
const Vue = require ('vue');

const helpers = {
  // Matches strings that look like functions
  // START:
  //   function
  //   0 or more spaces
  // FUNCTION NAME:
  //   anything 0 or more times
  //   0 or more spaces
  // ARGUMENTS:
  //   (
  //   ARGUMENT:
  //     anything followed by a comma, 0 or more times
  //     0 or more spaces
  //     0 or more times
  //   )
  //   0 or more spaces
  // DECLARATION:
  //   {
  //     maybe anything
  //     maybe return(s)
  //     0 or more times
  //   }
  functionRegex: /function( )*(.)*( )*\((.,* *){0,}\) *{(.*\n*)*}/,

  isFunctionDeclaration: function (str) {
    if (str.startsWith('function ') || str.startsWith('function(')) {
      return str.endsWith('}') && helpers.functionRegex.test(str);
    }
  
    // Good enough to match most arrow functions
    return /^\s*\w+\s*=>/.test(str) || /^\s*\([^)]*\)\s*=>/.test(str);
  },

  /**
   * Console logs helper error messages if verbose mode is enabled.
   *
   * @param  {any}      message   What should be logged
   * @param  {object}   options   Options object with the verbose option
   */
  log: function (message, options) {
    if (message && options && options.verbose) {
      console.log('Jest-Serializer-Vue-TJW:', message);
    }
  },

  /**
   * Returns a copy of the default settings object.
   * Used as a starting point to deviate from based on
   * user input, or to compare against in unit tests.
   *
   * @return {object}  Default settings
   */
  defaultSettings: function () {
    return {
      addInputValues: false,
      attributesToClear: [],
      clearInlineFunctions: false,
      // To see available options: https://github.com/beautify-web/js-beautify/blob/master/js/src/html/options.js
      formatting: {
        indent_char: ' ',
        indent_inner_html: true,
        indent_size: 2,
        inline: [],
        sep: '\n',
        unformatted: ['code', 'pre']
      },
      removeClassTest: false,
      removeComments: false,
      removeDataTest: true,
      removeDataTestid: true,
      removeDataTestId: true,
      removeDataQa: false,
      removeDataCy: false,
      removeDataVId: true,
      removeIdTest: false,
      removeIstanbulComments: true,
      removeServerRendered: true,
      sortAttributes: true,
      stringifyObjects: false,
      verbose: true
    };
  },

  /**
   * Determines if the passed in value is markup.
   *
   * @param  {string}  received  The markup to be serialized
   * @return {boolean}           true = value is HTML
   */
  isHtmlString: function (received) {
    return (
      received &&
      typeof(received) === 'string' &&
      received.startsWith('<')
    );
  },

  /**
   * Determines if the passed in value is a Vue wrapper.
   *
   * @param  {object}  received  The Vue wrapper containing the markup to be serialized
   * @return {boolean}           true = value is a Vue wrapper
   */
  isVueWrapper: function (received) {
    return (
      received &&
      typeof(received) === 'object' &&
      typeof(received.isVueInstance) === 'function'
    );
  },

  /**
   * Load the markup into Cheerio
   *
   * @param  {string} html  Markup for the snapshot
   * @return {object}       Cheerio object
   */
  $: function (html) {
    // https://github.com/fb55/DomHandler
    // https://github.com/fb55/htmlparser2/wiki/Parser-options
    const xmlOptions = {
      decodeEntities: false,
      lowerCaseAttributeNames: false,
      normalizeWhitespace: false,
      recognizeSelfClosing: false,
      xmlMode: false
    };
    const dom = htmlparser2.parseDOM(html, xmlOptions);
    const $ = cheerio.load(dom, { xml: xmlOptions });
    return $;
  },

  /**
   * Swaps single and double quotes
   *
   * @param  {string} str Input
   * @return {string}     Swapped output
   */
  swapQuotes: function (str) {
    return str.replace(/[\'\"]/g, function (match) {
      return match === '"' ? '\'' : '"';
    });
  },

  /**
   * Same as JSON.stringify, but without quotes around object properties.
   *
   * @param  {object} obj data to stringify
   * @return {string}               stringified string
   */
  stringify: function (obj) {
    if (obj === null) {
      return 'null';
    }
    if (obj === undefined) {
      return 'undefined';
    }
    if (Number.isNaN(obj)) {
      return 'NaN';
    }
    if (obj === Infinity) {
      return 'Infinity';
    }
    if (obj === -Infinity) {
      return '-Infinity';
    }
    if (obj instanceof Error) {
      return 'Error: ' + obj.message;
    }
    if (obj instanceof Set) {
      return JSON.stringify([...obj]);
    }
    if (typeof(obj) === 'object' && typeof(obj.getTime) === 'function') {
      if (Number.isNaN(obj.getTime())) {
        return obj.toString(); // 'Invalid Date'
      } else {
        return obj.getTime() + ''; // '1583463154386'
      }
    }
    if (typeof(obj) === 'function') {
      return 'Function';
    }
    if (typeof(obj) !== 'object' || Array.isArray(obj)) {
      return JSON.stringify(obj) || '';
    }

    let props = Object
      .keys(obj)
      .map((key) => {
        return key + ':' + this.stringify(obj[key]);
      })
      .join(',');

    return '{' + props + '}';
  },

  /**
   * Creates a Vue instance to render the vnode as an HTML string.
   *
   * @param  {object} vnode  Vue's vnode object
   * @return {string}        The rendered HTML
   */
  vnodeToString: function (vnode) {
    const vm = new Vue({
      render: function () {
        return vnode;
      }
    });
    const html = vm.$mount().$el.outerHTML;
    vm.$destroy();
    return html;
  },

  // This does not seem to make an actual copy. It is still modifying the reference.
  /**
   * Makes a copy of the vnode, so we are not mutating the original reference passed in by the test.
   *
   * @param  {object} vnode Vue's vnode from the wrapper
   * @return {object}       A copy of the vnode
   *
  copyVnode: function (vnode) {
    const vm = new Vue({
      render: function () {
        return vnode;
      }
    });
    const copy = vm.$mount()._vnode;
    vm.$destroy();
    return copy;
  },
   */

  /**
   * Attempts a deep clone of the wrapper.vnode. Experimental,
   * will hit a stack exceed max size error if vnode is too large.
   * We don't want to mutate the original object, because it may be
   * used again in the same test by another expect().
   *
   * @param  {object}   wrapper   A Vue-Test-Utils wrapper
   * @param  {object}   options   The options object with verbose logging setting
   * @param  {Function} cloneDeep Lodash clone module, or a mock for testing
   * @return {object}             A copy of the wrapper.vnode
   */
  cloneVnode: function (wrapper, options, cloneDeep) {
    if (wrapper && wrapper.vnode) {
      let vnode;
      try {
        // vnode = this.copyVnode(wrapper.vnode);
        vnode = cloneDeep(wrapper.vnode);
      } catch (err) {
        this.log(err, options);
        vnode = undefined;
      }
      return vnode;
    }
  }
};

module.exports = helpers;
