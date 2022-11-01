<template>
  <div>
    <!-- <img src="@/assets/flag/us.jpg" /> -->
    <div className="site-card-border-less-wrapper">
      <a-card style="width: 1200px">
        <div id="main" style="width: 1000px; height: 400px"></div>
      </a-card>
    </div>
    <br />
    <div className="site-card-border-less-wrapper">
      <a-card style="width: 1200px">
        <div id="main2" style="width: 1000px; height: 400px"></div>
      </a-card>
    </div>
    <br />
    <div className="site-card-border-less-wrapper">
      <a-card style="width: 1200px">
        <div id="main3" style="width: 1000px; height: 400px"></div>
      </a-card>
    </div>
    <br />
    <div className="site-card-border-less-wrapper">
      <a-card style="width: 1200px">
        <div id="main4" style="width: 1000px; height: 400px"></div>
      </a-card>
    </div>
    <br />
    <div className="site-card-border-less-wrapper">
      <a-card style="width: 1200px">
        <div id="main5" style="width: 1000px; height: 400px"></div>
      </a-card>
    </div>
    <br />
    <div className="site-card-border-less-wrapper">
      <a-card style="width: 1200px">
        <div id="main6" style="width: 1000px; height: 400px"></div>
      </a-card>
    </div>
    <br />
    <div className="site-card-border-less-wrapper">
      <a-card style="width: 1200px">
        <div id="main7" style="width: 1000px; height: 400px"></div>
      </a-card>
    </div>
    <br />
    <div className="site-card-border-less-wrapper">
      <a-card style="width: 1200px">
        <div id="main8" style="width: 1000px; height: 400px"></div>
      </a-card>
    </div>
    <br />
    <div className="site-card-border-less-wrapper">
      <a-card style="width: 1200px">
        <div id="main9" style="width: 1000px; height: 400px"></div>
      </a-card>
    </div>
    <div className="site-card-border-less-wrapper">
      <a-card style="width: 1200px">
        <div id="main10" style="width: 1000px; height: 400px"></div>
      </a-card>
    </div>
    <br />
  </div>
</template>
<script>
import * as echarts from "echarts";
import { TreeSelect } from "ant-design-vue";
export default {
  name: "ChartPage",
  data() {
    return {};
  },
  methods: {
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"));
      var myChart2 = echarts.init(document.getElementById("main2"));
      var myChart3 = echarts.init(document.getElementById("main3"));
      var myChart4 = echarts.init(document.getElementById("main4"));
      var myChart5 = echarts.init(document.getElementById("main5"));
      var myChart6 = echarts.init(document.getElementById("main6"));
      var myChart7 = echarts.init(document.getElementById("main7"));
      var myChart8 = echarts.init(document.getElementById("main8"));
      var myChart9 = echarts.init(document.getElementById("main9"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "各协办单位报名人数",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // Use axis to trigger tooltip
            type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
          },
        },
        legend: {
          orient: "horizontal",
          icon: "rect",
          itemHeight: 16,
          itemWidth: 16,
          left: "right",
          itemGap: 10,
          align: "left",
          formatter: ["{a|{name}}"].join("\n"),
          textStyle: {
            height: 8,
            rich: {
              a: {
                verticalAlign: "bottom",
              },
            },
          },
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
          data: ["经济学院", "法学院", "文学院", "研究所", "外国语学院"],
          axisTick: {
            alignWithLabel: true,
          },
        },
        series: [
          {
            name: "合适",
            type: "bar",
            stack: "total",
            barWidth: 25,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: "#93DD62" },
                { offset: 1, color: "#52C41A" },
              ]),
            },
            label: {
              show: true,
              formatter: "{c} 人",
              color: "white",
            },
            emphasis: {
              focus: "series",
            },
            data: [30, 30, 30, 30, 30],
          },
          {
            name: "不合适",
            type: "bar",
            stack: "total",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: "#FF7774" },
                { offset: 1, color: "#F5222D" },
              ]),
            },
            label: {
              show: true,
              formatter: function (params) {
                let s = "";
                if (params.data == 0) {
                  s = params.data;
                } else {
                  s = params.data + "人";
                }
                return s;
              },
              color: "white",
            },
            emphasis: {
              focus: "series",
            },
            data: [30, 0, 30, 30, 30],
          },
          {
            name: "未处理",
            type: "bar",
            stack: "total",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: "#FFC068" },
                { offset: 1, color: "#FA8C17" },
              ]),
            },
            label: {
              show: true,
              formatter: "{c} 人",
              color: "white",
            },
            emphasis: {
              focus: "series",
            },
            data: [500, 500, 500, 500, 500],
          },
          //series中push合计的数据
          {
            name: "总计",
            type: "bar",
            stack: "",
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#000",
              },
            },
            z: -1,
            //不同系列的柱间距离，为百分比,如果想要两个系列的柱子重叠，可以设置 barGap 为 '-100%'。
            barGap: "-100%",
            data: [560, 530, 560, 560, 560],
          },
        ],
      });
      myChart2.setOption({
        title: {
          text: "日报名趋势（人）",
        },
        xAxis: {
          type: "category",
          data: ["09.18", "09.19", "09.20", "09.21", "09.22", "09.23", "09.14"],
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [15, 23, 24, 58, 35, 17, 26],
            symbol: "circle",
            type: "line",
            color: "#1890FF",
          },
        ],
      });
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
                width: 28,
                backgroundColor: {
                  image:
                    "https://pic.jitudisk.com/public/2022/10/28/3c32d33594955.jpg",
                },
              },
              UK: {
                height: 10,
                width: 28,
                backgroundColor: {
                  image:
                    "https://pic.jitudisk.com/public/2022/10/28/60e4a051095fa.jpg",
                },
              },
              CA: {
                height: 10,
                width: 28,
                backgroundColor: {
                  image:
                    "https://pic.jitudisk.com/public/2022/10/28/f7f8f12c31ab9.jpg",
                },
              },
              JP: {
                height: 10,
                width: 28,
                backgroundColor: {
                  image:
                    "https://pic.jitudisk.com/public/2022/10/28/c36002e301afb.jpg",
                },
              },
              KR: {
                height: 10,
                width: 28,
                backgroundColor: {
                  image:
                    "https://pic.jitudisk.com/public/2022/10/28/e2a24d4e47f5a.png",
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
      myChart4.setOption({
        title: {
          text: "性別",
          left: "left",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "right",
          itemGap: 10,
          align: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 30, name: "男" },
              { value: 30, name: "女" },
              { value: 20, name: "保密" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
      myChart5.setOption({
        legend: {
          orient: "vertical",
          left: "right",
          itemGap: 10,
          align: "left",
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: [50, 250],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: [
              { value: 40, name: "rose 1" },
              { value: 38, name: "rose 2" },
              { value: 32, name: "rose 3" },
              { value: 30, name: "rose 4" },
              { value: 28, name: "rose 5" },
              { value: 26, name: "rose 6" },
              { value: 22, name: "rose 7" },
              { value: 18, name: "rose 8" },
            ],
          },
        ],
      });
      myChart6.setOption({
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
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
                        { offset: 1, color: "#1890FF " },
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
                        { offset: 1, color: "#FA8C16" },
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
                        { offset: 1, color: "#F5222D" },
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
                        { offset: 0, color: "#FF7774" },
                        { offset: 1, color: "#F5222D" },
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
                        { offset: 0, color: "#FF7774" },
                        { offset: 1, color: "#F5222D" },
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
      myChart7.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "right",
          itemGap: 10,
          align: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
          },
        ],
      });
      myChart8.setOption({
        title: {},
        xAxis: {
          data: ["教授", "副教授", "讲师", "助教"],
          axisLabel: {
            inside: true,
            color: "#fff",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          z: 10,
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "#999",
          },
        },
        dataZoom: [
          {
            type: "inside",
          },
        ],
        series: [
          {
            type: "bar",
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#FE7774" },
                { offset: 1, color: "#F5232D" },
              ]),
            },
            data: [220, 182, 191, 234],
          },
        ],
      });
      myChart9.setOption({
        title: {
          text: "World Population",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
        },
        xAxis: {
          type: "category",
          data: ["Brazil", "Indonesia", "USA", "India", "China", "World"],
        },
        series: [
          {
            name: "2011",
            type: "bar",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                { offset: 0, color: "#FFBF67" },
                { offset: 1, color: "#FA8C16" },
              ]),
            },
            data: [18203, 23489, 29034, 104970, 131744, 630230],
          },
          {
            name: "2012",
            type: "bar",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                { offset: 0, color: "#94DE63" },
                { offset: 1, color: "#53C41B" },
              ]),
            },
            data: [19325, 23438, 31000, 121594, 134141, 681807],
          },
          {
            name: "2013",
            type: "bar",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                { offset: 0, color: "#84A4FF" },
                { offset: 1, color: "#2F54EB" },
              ]),
            },
            data: [17325, 25438, 36000, 111594, 164141, 581807],
          },
        ],
      });
    },
  },
  mounted() {
    this.initChart();
  },
};
</script>
<style>
.site-card-border-less-wrapper {
  padding: 30px;
  background: #ececec;
}
</style>

