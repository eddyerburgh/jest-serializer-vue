const helpers = require('./helpers.js');
const addInputValues = require('./addInputValues.js');
const replaceObjectObject = require('./replaceObjectObject.js');

/**
 * Checks if a Vue wrapper is passed in,
 * clones the vnode and mutates the clone.
 *
 * @param  {object}   received   The vue wrapper object or string
 * @param  {object}   options    Options object for this serializer
 * @param  {Function} cloneDeep  Lodash clone module, or a mock for testing
 * @return {string}              HTML string to be serialized
 */
function vnodeManipulation (received, options, cloneDeep) {
  let html = received;
  if (helpers.isVueWrapper(received)) {
    const vnode = helpers.cloneVnode(received, options, cloneDeep);
    if (vnode) {
      addInputValues(vnode, options);
      replaceObjectObject(vnode, options);
      html = helpers.vnodeToString(vnode) || '';
    } else {
      html = received.html();
    }
  }

  return html;
}

module.exports = vnodeManipulation;
