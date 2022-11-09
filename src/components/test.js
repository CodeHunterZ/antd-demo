chartOption6: {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    grid: {
      left: 20,
      right: 20,
      top: 20,
      bottom: 0,
      containLabel: true
    },
    xAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value} 人"
      },
      position: "top",
      splitNumber: 10,
      minInterval: 1,
      axisTick: {
        show: true
      },
      axisLine: {
        show: true
      }
    },
    yAxis: {
      inverse: true,
      type: "category",
      data: [],
      axisPointer: {
        show: true
      },
      axisTick: {
        show: true,
        alignWithLabel: true
      },
      axisLine: {
        show: true
      },
      axisLabel: {
        overflow: "truncate",
        formatter: () => {},
        margin: 10,
        rich: {
          value: {
            lineHeight: 0,
            align: "left"
          }
        }
      }
    },
    series: [
      {
        data: [],
        type: "bar",
        barWidth: 25,
        itemStyle: {
          normal: {
            // 每根柱子颜色设置
            color: function(params) {
              const colorList = [
                new echarts.graphic.LinearGradient(
                  0,
                  0,
                  1,
                  0,
                  [
                    { offset: 0, color: "#91D5FF" },
                    { offset: 1, color: "#1890FF " }
                  ],
                  false
                ),
                // 2
                new echarts.graphic.LinearGradient(
                  0,
                  0,
                  1,
                  0,
                  [
                    { offset: 0, color: "#FFBF68" },
                    { offset: 1, color: "#FA8C16" }
                  ],
                  false
                ),
                // 3
                new echarts.graphic.LinearGradient(
                  0,
                  0,
                  1,
                  0,
                  [
                    { offset: 0, color: "#FF7774" },
                    { offset: 1, color: "#F5222D" }
                  ],
                  false
                )
              ];
              console.log(JSON.stringify(params));
              if (params.dataIndex > -1 && params.dataIndex > 3) {
                return colorList[0];
              } else if (params.dataIndex == params.data.total) {
                return colorList[0];
              } else {
                return colorList[1];
              }
            }
          }
        }
      }
    ]
  },







  myChart3.setOption({
    title: {
      text: "人才画像分析",
      subtext: "报名IP地点",
    },
    legend: {
      orient: "horizontal",
      left: "right",
      itemGap: 10,
      align: "left",
    },
    xAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value} 人",
      },
      position: "top",
    },
    yAxis: {
      type: "category",
      data: ["US", "UK", "CA", "JP", "KR"],
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        formatter: function (value) {
          return "{" + value + "| }\n{value|" + value + "}";
        },
        margin: 20,
        rich: {
          value: {
            lineHeight: 30,
            align: "left",
          },
          US: {
            height: 10,
            width:28,
            backgroundColor: {
              image: "https://pic.jitudisk.com/public/2022/10/28/3c32d33594955.jpg",
            },
          },
          UK: {
            height: 10,
            width:28,
            backgroundColor: {
              image: "https://pic.jitudisk.com/public/2022/10/28/60e4a051095fa.jpg",
            },
          },
          CA: {
            height: 10,
            width:28,
            backgroundColor: {
              image: "https://pic.jitudisk.com/public/2022/10/28/f7f8f12c31ab9.jpg",
            },
          },
          JP: {
            height: 10,
            width:28,
            backgroundColor: {
              image: "https://pic.jitudisk.com/public/2022/10/28/c36002e301afb.jpg",
            },
          },
          KR: {
            height: 10,
            width:28,
            backgroundColor: {
              image: "https://pic.jitudisk.com/public/2022/10/28/e2a24d4e47f5a.png",
            },
          },
        },
      },
    },
    series: [
      {
        data: [120, 200, 150, 80, 70],
        type: "bar",
        barWidth: 25,
        itemStyle: {
          normal: {
            // 每根柱子颜色设置
            color: function (params) {
              const colorList = [
                new echarts.graphic.LinearGradient(
                  0,
                  0,
                  1,
                  0,
                  [
                    { offset: 0, color: "#91D5FF" },
                    { offset: 1, color: "#1890FF" },
                  ],
                  false
                ),
                // 2
                new echarts.graphic.LinearGradient(
                  0,
                  0,
                  1,
                  0,
                  [
                    { offset: 0, color: "#D3ADF7" },
                    { offset: 1, color: "#722ED1" },
                  ],
                  false
                ),
                // 3
                new echarts.graphic.LinearGradient(
                  0,
                  0,
                  1,
                  0,
                  [
                    { offset: 0, color: "#FFADD2" },
                    { offset: 1, color: "#EB2F96" },
                  ],
                  false
                ),
                // 4
                new echarts.graphic.LinearGradient(
                  0,
                  0,
                  1,
                  0,
                  [
                    { offset: 0, color: "#FFADD2" },
                    { offset: 1, color: "#EB2F96" },
                  ],
                  false
                ),
                // 5
                new echarts.graphic.LinearGradient(
                  0,
                  0,
                  1,
                  0,
                  [
                    { offset: 0, color: "#FFADD2" },
                    { offset: 1, color: "#EB2F96" },
                  ],
                  false
                ),
              ];
              return colorList[params.dataIndex];
            },
          },
        },
      },
    ],
  });





  [
    {
      name: "前三名",
      data: [200, 150, 120],
      type: "bar",
      barWidth: 25,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: "#FFADD2" },
          { offset: 1, color: "#EB2F96" },
        ]),
      },
    },
    {
      name: "中间",
      data: [5,80],
      type: "bar",
      barWidth: 25,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: "#D3ADF7" },
          { offset: 1, color: "#722ED1" },
        ]),
      },
    },
    {
      name: "最后",
      data: [4,70],
      type: "bar",
      barWidth: 25,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: "#91D5FF" },
          { offset: 1, color: "#1890FF" },
        ]),
      },
    },
  ],