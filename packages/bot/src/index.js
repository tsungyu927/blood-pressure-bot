const request = require('request')
const {
  getValueSync,
  setProfileSync,
  setNewDataSync,
} = require('./firebase/firebaseInit')
const completeRecord = require('./templates/completeRecord')
const showRecords = require('./templates/showRecords')
const selectRegion = require('./templates/selectRegion')
const showWeather = require('./templates/showWeather')

module.exports = async function App(context) {
  // 加入好友時將資料寫入db
  if (context.event.isFollow) {
    await context.getUserProfile().then(async (profile) => {
      await setProfileSync(profile.userId, {
        avatar: profile.pictureUrl,
        loc: '',
        name: profile.displayName,
      })
    })
  }
  // 寫入紀錄
  if (context.state.toRecord) {
    if (
      context.event.text !== '增加紀錄' &&
      context.event.text !== '查看紀錄' &&
      context.event.text !== '查看天氣'
    ) {
      // 將填寫紀錄寫入資料庫
      const sourceData = await context.event.text
      const data = await sourceData.split('/').map((e) => parseInt(e)) // split and transfer to int
      if (data.length === 3) {
        // 資料格式正確
        await context.getUserProfile().then(async (profile) => {
          const complete = await setNewDataSync(profile.userId, {
            SYS: data[0],
            DIA: data[1],
            PULSE: data[2],
          })
          if (complete.id) {
            await completeRecord(context, complete)
          } else {
            await context.sendText('紀錄失敗，請再嘗試一次')
          }
        })
      } else {
        await context.sendText('輸入的資料格式錯誤')
      }
    }
    await context.setState({ toRecord: false })
  }

  if (context.event.isText) {
    if (context.event.text === '增加紀錄') {
      // 增加紀錄
      await context.setState({ toRecord: true })
      await context.sendText('請依照格式輸入：\n『收縮壓/舒張壓/脈搏』 \n\n例如：110/90/60')
    }
    if (context.event.text === '查看紀錄') {
      // 查看紀錄
      await context.getUserProfile().then(async (profile) => {
        await showRecords(context, profile.userId)
      })
    }
    if (context.event.text === '查看天氣') {
      // 顯示今天天氣
      await context.getUserProfile().then(async (profile) => {
        const data = await getValueSync(profile.userId, false)
        if (data.loc === '') {
          await selectRegion(context)
        }
      })
    }
  }

  // location
  if (context.event.isLocation) {
    const lat = await context.event.location.latitude
    const lon = await context.event.location.longitude
    // 地區
    const options = {
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&lang=zh_tw`,
      headers: {},
    }
    let data
    
    request(options, async function (error, response) {
      if (error) throw new Error(error)
      data = await JSON.parse(response.body)

      // 把data用flex message秀出來
      await showWeather(context, data)
      console.log(data)
    })

  }
}
