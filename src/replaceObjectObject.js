const helpers = require('./helpers.js');

/**
 * Recursively loops over vnode properties in Vue wrapper
 * to stringify attrs.
 *
 * @param  {object} vnode  A Vue wrapper
 */
function convertVNodeDataAttributesToString (vnode) {
  if (vnode.data && vnode.data.attrs) {
    for (const property in vnode.data.attrs) {
      let value = vnode.data.attrs[property];
      if (typeof(value) === 'string') {
        vnode.data.attrs[property] = value;
      } else {
        vnode.data.attrs[property] = helpers.swapQuotes(helpers.stringify(value));
      }
    }
  }
  if (vnode.children) {
    vnode.children.forEach(function (childVNode) {
      convertVNodeDataAttributesToString(childVNode);
    });
  }
}

/**
 * Checks settings and if Vue wrapper is valid, then converts
 * vnode attributes to a string with clean quotes.
 *
 * Example: title="[object Object]" becomes title="{a:'asdf'}"
 *
 * @param  {object} vnode    A cloned copy of wrapper.vnode to mutate
 * @param  {object} options  Options object for this serializer
 * @return {object}          Modified vnode
 */
function replaceObjectObject (vnode, options) {
  if (
    (vnode && typeof(vnode) === 'object' && !Array.isArray(vnode)) &&
    (options && options.stringifyObjects)
  ) {
    convertVNodeDataAttributesToString(vnode);
    return vnode;
  }
}

module.exports = replaceObjectObject;
