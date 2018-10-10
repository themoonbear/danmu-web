const b64 = require('base-64')

export default ({ app }, inject) => {
  inject('encodeAddress', address => b64.encode(address))
}
