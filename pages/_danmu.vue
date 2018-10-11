<template>
  <div/>
</template>

<script>
const DANMU_API = 'http://localhost:1323/danmu'
export default {
  layout: 'danmu',
  async fetch({ app, route, store }) {
    const data = await app.$axios.$get(DANMU_API + route.fullPath)
    if (data.code !== 0) {
      app.$toast.error(data.error)
      return
    }
    if (!data.result.state) {
      app.$toast.info('主播正在路上……')
      return
    }
    store.dispatch(`${data.result.platform}/danmu`, data.result)
  }
}
</script>
