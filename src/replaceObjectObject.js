const Vue = require ('vue');
const _cloneDeep = require('lodash.clonedeep');

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
    let wrapperCopy = _cloneDeep(wrapper);
    wrapperCopy.vnode = _cloneDeep(wrapper.vnode);
    convertVNodeDataAttributesToString(wrapperCopy.vnode);
    return vnodeToString(wrapperCopy.vnode);
  }
  return wrapper.html();
}

module.exports = replaceObjectObject;
