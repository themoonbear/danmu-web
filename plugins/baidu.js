if (process.env.NODE_ENV === 'production') {
  let _hmt = _hmt || []
  ;(function(document) {
    let hm = document.createElement('script')
    hm.async = 1
    hm.src = 'https://hm.baidu.com/hm.js?6bc72c2c76d9ffa739e0d402813b3e7a'
    let s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(hm, s)
  })(document)
}

export default ({ app: { router, $utils }, store }) => {
  if (process.env.NODE_ENV !== 'production') {
    return
  }
  router.afterEach((to, from) => {
    if (to.fullPath.length > 1) {
      _hmt.push([
        '_trackEvent',
        'danmu',
        'play',
        $utils(to.fullPath.substring(1))
      ])
    }
  })
}
