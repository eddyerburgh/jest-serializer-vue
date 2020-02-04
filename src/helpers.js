const cheerio = require('cheerio');
const htmlparser2 = require('htmlparser2');

const helpers = {
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
  }
};

module.exports = helpers;
