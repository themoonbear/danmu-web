export const strict = process.env.NODE_ENV !== 'production'
let queue = []
let intervalID = null
export const mutations = {
  receive(state, msg) {
    queue.push(msg)
    if(intervalID){
      return
    }
    intervalID = setInterval(() => {
      const danmu = queue.shift()
      if (!danmu) {
        clearInterval(intervalID)
        intervalID = null
        return
      }
      this.$toast.show(danmu, { position: 'top-left', duration: 10 * 1000 })
    }, 1000)
  }
}
