export const actions = {
  onopen({ commit }) {
    this.$toast.success('连接已建立')
  },
  onmessage({ commit }, message) {}
}
