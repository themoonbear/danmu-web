<template>
  <h1 style="color:red">This is a test page</h1>
</template>

<script>
const DANMU_API = 'http://localhost:1323/danmu'
export default {
  layout: 'danmu',
  async fetch({ app, route, store }) {
    const WebSocket = window.WebSocket || window.MozWebSocket
    if (!WebSocket) {
      app.$toast.error('浏览器不支持WEB SOCKET')
      return
    }
    const data = await app.$axios.$get(DANMU_API + route.fullPath)
    if (data.code !== 0) {
      app.$toast.error(data.error)
      return
    }
    const socket = new WebSocket(data.result.server)
    socket.onopen = () => {
      store.dispatch(`${data.result.platform}/onopen`)
    }
    socket.onclose = () => {
      app.$toast.info('连接已断开', { theme: 'outline' })
    }
    socket.onmessage = message => {
      store.dispatch(`${data.result.platform}/onmessage`, message)
    }
  }
}
</script>
