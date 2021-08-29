const path = require('path');

/**
 * If a user set a boolean setting in their Vue config, we apply it here.
 *
 * @param  {object} options       The default options object to override if needed
 * @param  {object} userSettings  The user's settings
 * @return {object}               Modified options object
 */
function booleanSettings (options, userSettings) {
  const booleanSettings = [
    'addInputValues',
    'clearInlineFunctions',
    'removeClassTest',
    'removeComments',
    'removeDataTest',
    'removeDataTestid',
    'removeDataTestId',
    'removeDataQa',
    'removeDataCy',
    'removeDataVId',
    'removeIdTest',
    'removeIstanbulComments',
    'removeServerRendered',
    'sortAttributes',
    'stringifyObjects',
    'verbose'
  ];
  booleanSettings.forEach(function (setting) {
    if (typeof(userSettings[setting]) === 'boolean') {
      options[setting] = userSettings[setting];
    }
  });
  return options;
}

/**
 * Validates the formatting options is an object.
 *
 * @param  {object} options       The default options object to override if needed
 * @param  {object} userSettings  The user's settings
 * @return {object}               Modified options object
 */
function validateFormatting (options, userSettings) {
  if (
    userSettings.formatting &&
    typeof(userSettings.formatting) === 'object' &&
    !Array.isArray(userSettings.formatting)
  ) {
    options.formatting = userSettings.formatting;
  }
  return options;
}

/**
 * Validates that the attributes to clear is an array of strings that do not
 * contain spaces.
 *
 * @param  {object} options       The default options object to override if needed
 * @param  {object} userSettings  The user's settings
 * @return {object}               Modified options object
 */
function validateAttributesToClear (options, userSettings) {
  if (
    userSettings.attributesToClear &&
    Array.isArray(userSettings.attributesToClear)
  ) {
    options.attributesToClear = [];
    userSettings.attributesToClear.forEach(function (attribute) {
      if (typeof(attribute) === 'string') {
        attribute = attribute.trim();
        if (!attribute.includes(' ')) {
          options.attributesToClear.push(attribute);
        }
      }
    });
    options.attributesToClear = Array.from(new Set(options.attributesToClear));
  }
  return options;
}

/**
 * Defines the default settings object.
 * Replaces the defaults if the user has defined the setting.
 *
 * @param  {object} userSettings The user's options.
 * @return {object}              The options object.
 */
function applySettings (userSettings) {
  let defaultSettings = {
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

  let options = defaultSettings;
  options = validateFormatting(options, userSettings);
  options = booleanSettings(options, userSettings);
  options = validateAttributesToClear(options, userSettings);
  return options;
}

/**
 * Attempt to load user settings stored in package.json.
 *
 * @param  {object} fs  The Node file system module, or a mock for testing
 * @return {object}     The settings the user stored in package.json or undefined
 */
function loadFromManifest (fs) {
  let manifest;
  const manifestLocation = path.join(process.cwd(), 'package.json');

  if (fs.existsSync(manifestLocation)) {
    manifest = require(manifestLocation);
  }

  return manifest && manifest.jestSerializer;
}

/**
 * Attempts to load user settings from the Vue-CLI config file.
 *
 * @param  {object} fs  The Node file system module, or a mock for testing
 * @return {object}     The settings the user stored in vue.config.js or undefined
 */
function loadFromVueConfig (fs) {
  let vueConfig;
  let vueConfigOptions = {};
  const vueConfigLocation = path.join(process.cwd(), 'vue.config.js');

  if (fs.existsSync(vueConfigLocation)) {
    vueConfig = require(vueConfigLocation);
  }

  if (vueConfig) {
    if (vueConfig.pluginOptions && vueConfig.pluginOptions.jestSerializer) {
      vueConfigOptions = vueConfig.pluginOptions.jestSerializer;
    }
    // Maybe one day these settings will be officially a part of the Vue CLI ¯\_(ツ)_/¯
    if (vueConfig.jestSerializer) {
      vueConfigOptions = vueConfig.jestSerializer;
    }
  }
  return vueConfigOptions;
}

/**
 * Loads the options from the vue.config.js file.
 * If none are found, fallsback to default settings.
 *
 * @param  {object} fs  The Node file system module, or a mock for testing
 * @return {object}     An options object for what to remove and how to format the snapshot markup
 */
function loadOptions (fs) {
  let userSettings = loadFromManifest(fs);
  if (!userSettings) {
    userSettings = loadFromVueConfig(fs);
  }

  const options = applySettings((userSettings || {}));

  return options;
}

module.exports = loadOptions;
