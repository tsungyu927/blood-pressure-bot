module.exports = async function selectRegion(context) {
  await context.replyText('請選擇區域', {
    quickReply: {
      items: [
        {
          type: 'action',
          action: {
            type: 'location',
            label: '查看本地的天氣',
          },
        },
      ],
    },
  })
}
