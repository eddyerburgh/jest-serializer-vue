const pretty = require('pretty');

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

  if (
    vueConfig &&
    vueConfig.pluginOptions &&
    vueConfig.pluginOptions.jestSerializer
  ) {
    if (vueConfig.pluginOptions.jestSerializer.pretty) {
      options.pretty = vueConfig.pluginOptions.jestSerializer.pretty;
    }
    if (typeof(vueConfig.pluginOptions.jestSerializer.removeDataTest) === 'boolean') {
      options.removeDataTest = vueConfig.pluginOptions.jestSerializer.removeDataTest;
    }
    if (typeof(vueConfig.pluginOptions.jestSerializer.removeServerRendered) === 'boolean') {
      options.removeServerRendered = vueConfig.pluginOptions.jestSerializer.removeServerRendered;
    }
  }

  // Maybe one day these settings will be officially a part of the Vue CLI ¯\_(ツ)_/¯
  if (vueConfig && vueConfig.jestSerializer) {
    if (vueConfig.jestSerializer.pretty) {
      options.pretty = vueConfig.jestSerializer.pretty;
    }
    if (typeof(vueConfig.jestSerializer.removeDataTest) === 'boolean') {
      options.removeDataTest = vueConfig.jestSerializer.removeDataTest;
    }
    if (typeof(vueConfig.jestSerializer.removeServerRendered) === 'boolean') {
      options.removeServerRendered = vueConfig.jestSerializer.removeServerRendered;
    }
  }

  return options;
}

/**
 * Determines if the passed in value is markup.
 *
 * @param  {string}  received  The markup to be serialized
 * @return {Boolean}           true = value is HTML
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
 * @return {Boolean}           true = value is a Vue wrapper
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

module.exports = {
  test: function (received) {
    return isHtmlString(received) || isVueWrapper(received);
  },
  print: function (received) {
    const options = loadOptions();
    let html = received || '';
    if (isVueWrapper(received)) {
      html = received.html();
    }
    html = removeServerRenderedText(html, options);
    html = removeDataTestAttributes(html, options);

    return pretty(html, options.pretty);
  }
};
