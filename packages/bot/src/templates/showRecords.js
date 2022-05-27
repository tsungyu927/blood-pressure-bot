const { getValueSync } = require('../firebase/firebaseInit')

async function getRecords(userId) {
  const snapshot = await getValueSync(userId, true)
  const doc = await snapshot.docs.map((value) => {
    return {
      id: value.id,
      data: value.data(),
    }
  })

  const arr = await doc.map((value, index) => {
    const date = value.data.DATE.toDate()
    const formatDate = `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    return {
      type: 'bubble',
      size: 'kilo',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: `No. ${index + 1}`,
            weight: 'bold',
            color: '#1DB446',
            size: 'sm',
          },
          {
            type: 'text',
            text: '血壓紀錄',
            weight: 'bold',
            size: 'xxl',
            margin: 'md',
          },
          {
            type: 'text',
            text: `${formatDate}`,
            size: 'xs',
            color: '#aaaaaa',
            wrap: true,
          },
          {
            type: 'separator',
            margin: 'xxl',
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'xxl',
            spacing: 'sm',
            contents: [
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: '收縮壓',
                    size: 'sm',
                    color: '#555555',
                    flex: 0,
                  },
                  {
                    type: 'text',
                    text: `${value.data.SYS}`,
                    size: 'sm',
                    color: '#111111',
                    align: 'end',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: '舒張壓',
                    size: 'sm',
                    color: '#555555',
                    flex: 0,
                  },
                  {
                    type: 'text',
                    text: `${value.data.DIA}`,
                    size: 'sm',
                    color: '#111111',
                    align: 'end',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: '脈搏',
                    size: 'sm',
                    color: '#555555',
                    flex: 0,
                  },
                  {
                    type: 'text',
                    text: `${value.data.PULSE}`,
                    size: 'sm',
                    color: '#111111',
                    align: 'end',
                  },
                ],
              },
            ],
          },
          {
            type: 'separator',
            margin: 'xxl',
          },
          {
            type: 'box',
            layout: 'horizontal',
            margin: 'md',
            contents: [
              {
                type: 'text',
                text: 'DATA ID',
                size: 'xs',
                color: '#aaaaaa',
                flex: 0,
              },
              {
                type: 'text',
                text: `${value.id}`,
                color: '#aaaaaa',
                size: 'xs',
                align: 'end',
              },
            ],
          },
        ],
      },
      styles: {
        footer: {
          separator: true,
        },
      },
    }
  })

  return arr
}

module.exports = async function showRecords(context, userId) {
  const arr = await getRecords(userId)
  const date = new Date()
  const formatDate = date.toLocaleDateString('zh-TW', {
    timeZone: 'Asia/Taipei',
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
  const content = [
    {
      type: 'bubble',
      size: 'kilo',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: '注意！！！',
            weight: 'bold',
            color: '#e02619',
            size: 'sm',
          },
          {
            type: 'text',
            text: '顯示結果',
            weight: 'bold',
            size: 'xxl',
            margin: 'md',
          },
          {
            type: 'text',
            size: 'xs',
            color: '#aaaaaa',
            wrap: true,
            text: `${formatDate}`,
          },
          {
            type: 'separator',
            margin: 'xxl',
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'xxl',
            spacing: 'sm',
            contents: [
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    size: 'sm',
                    color: '#555555',
                    flex: 1,
                    text: '僅顯示近十次紀錄',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: '若要查看完整紀錄',
                    size: 'sm',
                    color: '#555555',
                    flex: 1,
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: '請點擊下方按鈕',
                    size: 'sm',
                    color: '#555555',
                    flex: 1,
                  },
                ],
              },
            ],
          },
          {
            type: 'separator',
            margin: 'xxl',
          },
          {
            type: 'box',
            layout: 'horizontal',
            margin: 'md',
            contents: [
              {
                type: 'button',
                action: {
                  type: 'uri',
                  label: '點我看更多',
                  uri: `https://blood-pressure-recorder-493d0.web.app/${userId}`,
                },
                height: 'sm',
              },
            ],
          },
        ],
      },
      styles: {
        footer: {
          separator: true,
        },
      },
    },
    ...arr,
  ]
  if (arr.length === 0) {
    await context.sendText('您還沒有任何記錄！')
  } else {
    await context.sendFlex('您的近十次紀錄', {
      type: 'carousel',
      contents: content,
    })
  }
}
