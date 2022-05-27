module.exports = async function showWeather(context, data) {
    // 計算溫度 取到小數後一位
    const temp = (data.main.temp - 273).toFixed(1)

    await context.sendFlex('現在天氣',{
        type: "carousel",
        contents: [
          {
            type: "bubble",
            size: "micro",
            header: {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "text",
                  text: `${temp} °C`,
                  color: "#ffffff",
                  align: "start",
                  size: "3xl",
                  gravity: "center",
                  weight: "bold"
                },
                {
                  type: "text",
                  text: `${data.weather[0].description}`,
                  color: "#ffffff",
                  align: "start",
                  size: "lg",
                  gravity: "center",
                  margin: "lg"
                }
              ],
              backgroundColor: "#175DB3",
              paddingTop: "19px",
              paddingAll: "12px",
              paddingBottom: "20px"
            },
            body: {
              type: "box",
              layout: "horizontal",
              contents: [
                {
                  type: "box",
                  layout: "vertical",
                  contents: [
                    {
                      type: "text",
                      text: "濕度",
                      color: "#8C8C8C",
                      size: "sm",
                      wrap: true
                    },
                    {
                      type: "text",
                      text: `${data.main.humidity}%`,
                      size: "xxl"
                    }
                  ],
                  flex: 1
                },
                {
                  type: "box",
                  layout: "vertical",
                  contents: [
                    {
                      type: "image",
                      url: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`,
                      size: "md"
                    }
                  ]
                }
              ],
              spacing: "md",
              paddingAll: "12px",
              paddingBottom: "6px"
            },
            styles: {
              footer: {
                separator: false
              }
            }
          }
        ]
      })
}
