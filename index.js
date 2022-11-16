const beautify = require('pretty')

const isHtmlString = received => received && typeof received === 'string' && received[0] === '<'
const isVueWrapper = received => (
  received &&
  typeof received === 'object' &&
  typeof received.html === 'function'
)
const removeServerRenderedText = html => html.replace(/ data-server-rendered="true"/, '')
// [-\w]+ will catch 1 or more instances of a-z, A-Z, 0-9, hyphen (-), or underscore (_)
const removeDataTestAttributes = html => html.replace(/ data-test="[-\w]+"/g, '')

module.exports = {
  test (received) {
    return isHtmlString(received) || isVueWrapper(received)
  },
  print (received) {
    let html = (isVueWrapper(received) ? received.html() : received) || ''
    html = removeServerRenderedText(html)
    html = removeDataTestAttributes(html)
    return beautify(html, { indent_size: 2 })
  }
}
