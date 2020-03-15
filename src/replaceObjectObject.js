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
  if (typeof(obj) !== 'object' || Array.isArray(obj) || !obj) {
    return JSON.stringify(obj) || '';
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
    render: function () {
      return vnode;
    }
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
        let value = vnode.data.attrs[property];
        if (typeof(value) === 'string') {
          vnode.data.attrs[property] = value;
        } else {
          vnode.data.attrs[property] = swapQuotes(stringify(value));
        }
      }
    }
    if (vnode.children) {
      vnode.children.forEach(function (childVNode) {
        convertVNodeDataAttributesToString(childVNode);
      });
    }
  }
}

// This does not seem to make an actual copy. It is still modifying the reference.
/**
 * Makes a copy of the vnode, so we are not mutating the original reference passed in by the test.
 *
 * @param  {object} vnode Vue's vnode from the wrapper
 * @return {object}       A copy of the vnode
 *
function copyVnode (vnode) {
  const vm = new Vue({
    render: function () {
      return vnode;
    }
  });
  const copy = vm.$mount()._vnode;
  vm.$destroy();
  return copy;
}
 */

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
    // let vnode = copyVnode(wrapper.vnode);
    let vnode = _cloneDeep(wrapper.vnode);
    convertVNodeDataAttributesToString(vnode);
    return vnodeToString(vnode);
  }
  return wrapper.html();
}

module.exports = replaceObjectObject;
