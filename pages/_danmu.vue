<template>
  <div class="danmu"/>
</template>

<script>
const DANMU_API =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:1324/danmu'
    : 'https://api.moonbear.cn/danmu'
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
