const helpers = require('./helpers.js');

/**
 * Sets the value attribute on element based on data from the vnode.
 * If a value already exists, like with radio dials, set a v-model value.
 *
 * @param {object} vnode      A Vue node
 * @param {string} attribute  'value' or 'checked'
 */
function setValue (vnode, attribute) {
  vnode.data = vnode.data || {};
  vnode.data.attrs = vnode.data.attrs || {};
  let key = 'If the vnode value is `undefined` then this key won\'t match at the end.';
  let value = key;

  // Select, radio, and checkboxes use this
  if (
    vnode.data.directives &&
    vnode.data.directives.length
  ) {
    const directive = vnode.data.directives.find(function (directive) {
      return directive.rawName === 'v-model';
    });
    if (directive && directive.hasOwnProperty('value')) {
      value = directive.value;
    }
  }

  // should work on text, number, range, date, and textarea
  if (
    vnode.data.domProps &&
    vnode.data.domProps.hasOwnProperty(attribute)
  ) {
    value = vnode.data.domProps[attribute];
  }

  // this allows us to apply value="undefined" or v-model="undefined"
  // but only in the cases where that was the value in the vnode
  if (value === key) {
    return;
  }

  const processed = helpers.swapQuotes(helpers.stringify(value));
  if (!vnode.data.attrs.value) {
    vnode.data.attrs.value = processed;
  } else {
    vnode.data.attrs['v-model'] = processed;
  }
}

/**
 * Recursively loops over all vnodes and applies a value
 * attribute if the element has a value
 *
 * @param {object} vnode A Vue node
 */
function addVnodeValueAttribute (vnode) {
  setValue(vnode, 'value');

  if (vnode.children) {
    vnode.children.forEach(function (childVNode) {
      addVnodeValueAttribute(childVNode);
    });
  }
}

/**
 * Adds in a value attribue for all input elements so the snapshot.
 * <input> => <input value="cow">
 *
 * @param  {object} vnode    A cloned copy of the wrapper.vnode to mutate
 * @param  {object} options  Options object for this serializer
 * @return {object}          Modified vnode
 */
function addInputValues (vnode, options) {
  if (
    (vnode && typeof(vnode) === 'object' && !Array.isArray(vnode)) &&
    (options && options.addInputValues)
  ) {
    addVnodeValueAttribute(vnode);
  }
  return vnode;
}

module.exports = addInputValues;
