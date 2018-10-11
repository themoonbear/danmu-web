export const actions = {
  danmu({ commit }, data) {
    const WebSocket = window.WebSocket || window.MozWebSocket
    if (!WebSocket) {
      this.$toast.error('当前浏览器不支持')
      return
    }
    let client = new WebSocket(data.server)
    client.binaryType = 'arraybuffer'
    client.addEventListener('open', () => {
      this.$toast.success('已建立链接')
      let msg = { roomid: data.roomID, uid: data.uid }
      handshake(client, msg)
      heartbeat(client, msg)
    })
    client.addEventListener('message', event => {
      onmessage(event.data, msg => {
        if (!msg) {
          return
        }
        commit('receive', msg, { root: true })
      })
    })
    client.addEventListener('close', () => {
      this.$toast.info('已断开链接')
    })
    client.addEventListener('error', event => {
      console.log(event.data)
    })
  }
}
const MSG_TYPE_HEARTBEAT = 2
const MSG_TYPE_DANMU = 5
const MSG_TYPE_HANDSHAKE = 7

const HEARTBEAT_TIME = 30 * 1000

const HEAD_LEN = 16
const DEVICE_TYPE = 1
const DEVICE = 1

const MSG_CMD_DANMU = 'DANMU_MSG'
const MSG_CMD_GIFT = 'SEND_GIFT'
const MSG_CMD_RANK = 'ROOM_RANK'
const MSG_CMD_COMBO = 'COMBO_END'
const MSG_CMD_NOTICE = 'NOTICE_MSG'
const MSG_CMD_SYS = 'SYS_MSG'
const MSG_CMD_WELCOME = 'WELCOME'
const MSG_CMD_WELCOME_GUARD = 'WELCOME_GUARD'
const MSG_CMD_ENTRY_EFFECT = 'ENTRY_EFFECT'
const handlers = {}
const registerHandler = (cmd, handler) => {
  handlers[cmd] = handler
}
const getHandler = cmd => {
  return handlers[cmd]
}

registerHandler(MSG_CMD_DANMU, msg => {
  return (
    '<span style="color:yellow">' + msg.info[2][1] + '</span> : ' + msg.info[1]
  )
})

// registerHandler(MSG_CMD_WELCOME, msg => {
//   return msg.data.uname + ' 进入直播间'
// })

// registerHandler(MSG_CMD_WELCOME_GUARD, msg => {
//   return (
//     '<span style="font-size:18px; color:yellow">' +
//     msg.data.username +
//     '</span> 房管来了'
//   )
// })

// registerHandler(MSG_CMD_ENTRY_EFFECT, msg=>{
//   return msg.data.copy_writing
// })

// registerHandler(MSG_CMD_GIFT, msg => {
//   return (
//     '<span style="color:red">' +
//     msg.data.uname +
//     '</span> 赠送：' +
//     msg.data.giftName +
//     'X' +
//     msg.data.num
//   )
// })
const handleDanmu = msg => {
  const handler = getHandler(msg.cmd)
  if (!handler) {
    console.warn('unregister handler: ', msg)
    return
  }
  return handler(msg)
}

const encode = (data, dataType) => {
  let body = Buffer.from(JSON.stringify(data))
  let head = Buffer.alloc(HEAD_LEN)
  head.writeInt32BE(HEAD_LEN + body.length, 0)
  head.writeInt16BE(HEAD_LEN, 4)
  head.writeInt16BE(DEVICE_TYPE, 6)
  head.writeInt32BE(dataType, 8)
  head.writeInt32BE(DEVICE, 12)
  return Buffer.concat([head, body])
}

let cache = Buffer.alloc(0)
const onmessage = (data, callback) => {
  cache = Buffer.concat([cache, Buffer.from(data)])
  while (true) {
    if (cache.length < HEAD_LEN) {
      return
    }
    const length = cache.readInt32BE(0)
    if (cache.length < length) {
      return
    }
    const code = cache.readInt32BE(8)
    let msg = cache.toString('utf-8', HEAD_LEN, length)
    cache = cache.slice(length, cache.length)
    if (code !== MSG_TYPE_DANMU) {
      continue
    }
    try {
      msg = JSON.parse(msg)
    } catch (error) {
      console.error(error, msg)
      continue
    }
    callback(handleDanmu(msg))
  }
}

const handshake = (client, msg) => {
  if (client && client.readyState === 1) {
    client.send(encode(msg, MSG_TYPE_HANDSHAKE))
  }
}

const heartbeat = (client, msg) => {
  const bytes = encode(msg, MSG_TYPE_HEARTBEAT)
  let intervalID = setInterval(() => {
    if (client && client.readyState === 1) {
      client.send(bytes)
    } else {
      clearInterval(intervalID)
    }
  }, HEARTBEAT_TIME)
}
