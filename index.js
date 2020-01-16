const pretty = require('pretty');
const Vue = require ('vue');

/**
 * Loads the options from the vue.config.js file.
 * If none are found, fallsback to default settings.
 *
 * @return {object}  An options object for what to remove and how to format the snapshot markup
 */
function loadOptions () {
  const fs = require('fs');
  const path = require('path');

  const vueConfigLocation = path.join(process.cwd(), 'vue.config.js');
  let vueConfig;
  if (fs.existsSync(vueConfigLocation)) {
    vueConfig = require(vueConfigLocation);
  }

  let options = {
    removeDataTest: true,
    removeServerRendered: true,
    removeDataVId: true,
    stringifyObjects: true,
    // To see available options: https://github.com/beautify-web/js-beautify/blob/master/js/src/html/options.js
    pretty: {
      indent_char: ' ',
      indent_inner_html: true,
      indent_size: 2,
      inline: [],
      sep: '\n',
      unformatted: ['code', 'pre']
    }
  };

  let vueConfigOptions = {};
  if (vueConfig) {
    if (vueConfig.pluginOptions && vueConfig.pluginOptions.jestSerializer) {
      vueConfigOptions = vueConfig.pluginOptions.jestSerializer;
    }
    // Maybe one day these settings will be officially a part of the Vue CLI ¯\_(ツ)_/¯
    if (vueConfig.jestSerializer) {
      vueConfigOptions = vueConfig.jestSerializer;
    }
  }

  options.pretty = vueConfigOptions.pretty || options.pretty;
  if (typeof(vueConfigOptions.removeDataTest) === 'boolean') {
    options.removeDataTest = vueConfigOptions.removeDataTest;
  }
  if (typeof(vueConfigOptions.removeServerRendered) === 'boolean') {
    options.removeServerRendered = vueConfigOptions.removeServerRendered;
  }
  if (typeof(vueConfigOptions.removeDataVId) === 'boolean') {
    options.removeDataVId = vueConfigOptions.removeDataVId;
  }
  if (typeof(vueConfigOptions.stringifyObjects) === 'boolean') {
    options.stringifyObjects = vueConfigOptions.stringifyObjects;
  }

  return options;
}

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
 * @param  {string} html    The markup being serialized.
 * @param  {object} options Options object for this serializer
 * @return {string}         Modified HTML string
 */
function removeServerRenderedText (html, options) {
  if (!options || options.removeServerRendered) {
    return html.replace(/ data-server-rendered="true"/g, '');
  }
  return html;
}

/**
 * This removes data-test="whatever" from your snapshots.
 *
 * If you also want to remove them from your production builds, see:
 * https://forum.vuejs.org/t/how-to-remove-attributes-from-tags-inside-vue-components/24138
 *
 * @param  {string} html    The markup being serialized.
 * @param  {object} options Options object for this serializer
 * @return {string}         Modified HTML string
 */
function removeDataTestAttributes (html, options) {
  if (!options || options.removeDataTest) {
    // [-\w]+ will catch 1 or more instaces of a-z, A-Z, 0-9, hyphen (-), or underscore (_)
    return html.replace(/ data-test="[-\w]+"/g, '');
  }
  return html;
}

/**
 * This removes data-v-1234abcd="" from your snapshots.
 *
 * @param  {string} html    The markup being serialized.
 * @param  {object} options Options object for this serializer
 * @return {string}         Modified HTML string
 */
function removeScopedStylesDataVIDAttributes (html, options) {
  if (!options || options.removeDataVId) {
    // [-\w]+ will catch 1 or more instaces of a-z, A-Z, 0-9, hyphen (-), or underscore (_)
    return html.replace(/ data-v-[-\w]+=""/g, '');
  }
  return html;
}

/**
 * Swaps single and double quotes
 *
 * @param  {string} str Input
 * @return {string}     Swapped output
 */
function swapQuotes (str) {
  return str.replace(/[\'\"]/g, function (match) {
    return match === '"' ? '\'' : '"';
  });
}

/**
 * Same as JSON.stringify, but without quotes around object properties.
 *
 * @param  {object} obj data to stringify
 * @return {string}               stringified string
 */
function stringify (obj) {
  if (typeof obj !== 'object' || Array.isArray(obj)) {
    return JSON.stringify(obj);
  }

  let props = Object
    .keys(obj)
    .map((key) => {
      return key + ':' + stringify(obj[key]);
    })
    .join(',');

  return '{' + props + '}';
}

/**
 * Creates a Vue instance to render the vnode as an HTML string.
 *
 * @param  {object} vnode  Vue's vnode object
 * @return {string}        The rendered HTML
 */
function vnodeToString (vnode) {
  const vm = new Vue({
    render: () => vnode
  });
  const html = vm.$mount().$el.outerHTML;
  vm.$destroy();
  return html;
}

/**
 * Recursively loops over vnode properties in Vue wrapper
 * to stringify attrs.
 *
 * @param  {object} vnode  A Vue wrapper
 */
function convertVNodeDataAttributesToString (vnode) {
  if (vnode) {
    if (vnode.data && vnode.data.attrs) {
      for (const property in vnode.data.attrs) {
        vnode.data.attrs[property] = swapQuotes(stringify(vnode.data.attrs[property]));
      }
    }
    if (vnode.children) {
      vnode.children.forEach(function (childVNode) {
        convertVNodeDataAttributesToString(childVNode);
      });
    }
  }
}

/**
 * Checks settings and if Vue wrapper is valid, then converts
 * vnode attributes to a string with clean quotes.
 *
 * Example: title="[object Object]" becomes title="{a:'asdf'}"
 *
 * @param  {object} wrapper  A Vue wrapper
 * @param  {object} options  Options object for this serializer
 * @return {string}          Modified HTML string
 */
function replaceObjectObject (wrapper, options) {
  if (
    (!options || options.stringifyObjects) &&
    (wrapper && wrapper.vnode)
  ) {
    convertVNodeDataAttributesToString(wrapper.vnode);
    return vnodeToString(wrapper.vnode);
  }
  return wrapper.html();
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
    html = removeDataTestAttributes(html, options);
    html = removeScopedStylesDataVIDAttributes(html, options);

    return pretty(html, options.pretty);
  }
};
