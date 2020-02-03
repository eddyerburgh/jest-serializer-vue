const path = require('path');

/**
 * If a user set a boolean setting in their Vue config, we apply it here.
 *
 * @param  {object} options          The default options object to override if needed
 * @param  {object} vueConfigOptions The user's settings
 * @return {object}                  Modified options object
 */
function booleanSettings (options, vueConfigOptions) {
  const booleanSettings = [
    'removeClassTest',
    'removeComments',
    'removeDataTest',
    'removeDataTestid',
    'removeDataTestId',
    'removeDataQa',
    'removeDataVId',
    'removeIdTest',
    'removeServerRendered',
    'stringifyObjects'
  ];
  booleanSettings.forEach(function (setting) {
    if (typeof(vueConfigOptions[setting]) === 'boolean') {
      options[setting] = vueConfigOptions[setting];
    }
  });
  return options;
}

/**
 * Defines the default settings object.
 * Replaces the defaults if the user has defined the setting.
 *
 * @param  {object} vueConfigOptions The user's options.
 * @return {object}                  The options object.
 */
function applySettings (vueConfigOptions) {
  let defaultSettings = {
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
    removeDataVId: true,
    removeIdTest: false,
    removeServerRendered: true,
    stringifyObjects: false
  };

  let options = defaultSettings;

  if (
    vueConfigOptions.formatting &&
    typeof(vueConfigOptions.formatting) === 'object' &&
    !Array.isArray(vueConfigOptions.formatting)
  ) {
    options.formatting = vueConfigOptions.formatting;
  } else {
    options.formatting = defaultSettings.formatting;
  }

  options = booleanSettings(options, vueConfigOptions);

  return options;
}

/**
 * Loads the options from the vue.config.js file.
 * If none are found, fallsback to default settings.
 *
 * @param  {object} fs  The Node file system module, or a mock for testing
 * @return {object}     An options object for what to remove and how to format the snapshot markup
 */
function loadOptions (fs) {
  const vueConfigLocation = path.join(process.cwd(), 'vue.config.js');
  let vueConfig;
  if (fs.existsSync(vueConfigLocation)) {
    vueConfig = require(vueConfigLocation);
  }

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

  const options = applySettings(vueConfigOptions);

  return options;
}

module.exports = loadOptions;
