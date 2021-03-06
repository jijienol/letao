$(function(){
  var myChart = echarts.init(document.getElementById('echars1'));

// 指定图表的配置项和数据
var option = {
    title: {
        text: '2020年访问次数'
    },
    tooltip: {},
    legend: {
        data:['人数']
    },
    xAxis: {
        data: ["1月","3月","5月","7月","9月","11月"]
    },
    yAxis: {},
    series: [{
        name: '人数',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);

var myChart2 = echarts.init(document.getElementById('echars2'));

// 指定图表的配置项和数据
var option2 = {
  backgroundColor: '#2c343c',

  title: {
      text: 'Customized Pie',
      left: 'center',
      top: 20,
      textStyle: {
          color: '#ccc'
      }
  },

  tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
  },

  visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: {
          colorLightness: [0, 1]
      }
  },
  series: [
      {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 274, name: '联盟广告'},
              {value: 235, name: '视频广告'},
              {value: 400, name: '搜索引擎'}
          ].sort(function (a, b) { return a.value - b.value; }),
          roseType: 'radius',
          label: {
              color: 'rgba(255, 255, 255, 0.3)'
          },
          labelLine: {
              lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
          },
          itemStyle: {
              color: '#c23531',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
          },

          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
              return Math.random() * 200;
          }
      }
  ]
};

// 使用刚指定的配置项和数据显示图表。
myChart2.setOption(option2);
$('.abv').css
})