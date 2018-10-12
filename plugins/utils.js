const b64 = require('base-64')

export default ({ app }, inject) => {
  inject('utils', {
    b64Encode(address) {
      return b64.encode(address)
    },
    b64Decode(address) {
      return b64.decode(address)
    }
  })
}
