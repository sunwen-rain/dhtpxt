<template>
  <div class="screen-box" :style="{backgroundImage: 'url('+meetingInfo.thumbnail+')'}" v-if="isHasM">
    <div class="realtime-box">
      <!--<img src="../../assets/ewm.png" alt="" class="ewm">-->
      <!--<div class="meeting-top">
        <img :src="meetingInfo.logourl" alt="">
        <span>{{meetingInfo.meetingtitle}}</span>
      </div>-->
      
      
      <div class="ticket-box">
        <div class="meeting-score">
          <div class="meeting-score-box">
            <div class="meeting-question"><p> <img src="../../assets/aq.png" alt=""> {{meetingInfo.questionname}}</p></div>
            <div class="meeting-content">
              <ul class="meeting-options">
                <li v-for="(item,index) in meetingInfo.infos">
                  <i>{{alloptions[index]}}、</i>
                  <p>{{item.optioncontent}}</p>
                </li>
              </ul>
              <div class="echart-box">
                <chart :data="cdata" :yaxis="yaxis" :xaxis="xaxis"></chart>
                <!--<div ref="meetingchart" class="meetingchart">

                </div>-->
              </div>
            </div>
          </div>
        </div>

        
        

        <div class="meeting-state">
          <div v-if="!isEnded" class="cdnum-box">
            <span @click="gotoStart">{{countdown}}</span><i>秒</i>
          </div>
          <span v-if='isEnded' class="end">投票结束</span>
          <qriously class="ewm" :value="meetingInfo.qrcodecontent ? meetingInfo.qrcodecontent : ''" :size="size" />
        </div>
      </div>
    </div>
  </div>
  <div class="no-meeting" v-else>
    找不到对应的赛事信息
  </div>
</template>

<script>
import Qs from 'qs'
//import echarts from 'echarts'
import chart from '../../components/chart.vue'
export default {
  name: 'realtime',
  data () {
    return {
      meetingInfo : {
        debatetitle: '2019肝胆胰肿瘤MDT交流峰会1'
      },
      sparams: {
        meetingcode: ''
      },
      tparams: {
        client_id: 'sspc.poll.screen', 
        client_secret: 'w34e12w3e4r7u8jjiyfew2!', 
        grant_type: "password"
      },
      isHasM: true,
      isEnded: false,
      countdown: 60,
      cdata: [],
      alloptions: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'],
      yaxis: ['0%', '20%', '40%', '60%', '80%', '100%'].reverse(),
      xaxis: [],
      size: 200
    }
  },
  components: {
    chart
  },
  mounted () {
    if (this.$route.query.meetingcode) {
      this.isHasM = true
      this.sparams.meetingcode = this.$route.query.meetingcode
      this.sparams.teamcode = this.$route.query.teamcode
      this.sparams.casecode = this.$route.query.casecode
      this.sparams.questioncode = this.$route.query.questioncode
    } else {
      this.isHasM = false
    }
    this.getToken()

    this.size = document.documentElement.clientWidth * .15

    window.onbeforeunload = function () {
      return '投票正在进行中，确认关闭浏览器？'
    }
  },
  methods: {
    getToken () {
      var _t = this
      this.axios.post('access_token', this.tparams, {
        transformRequest: [function (data) {
          // 对 data 进行任意转换处理
          return Qs.stringify(data);
        }]
      }).then(function (res) {
        _t.$store.commit('initToken',res.data)
        _t.axios.defaults.headers.common['Authorization'] = "Bearer " + res.data.access_token
        _t.getInfo()
      })
    },
    getInfo () {
      var _t = this
      this.axios.post('api/screen/getmeetinginfo', this.sparams).then(function (res) {
        if (res.data.code == '200') {
          
          var kcpicurl = res.data.kcpicurl
          var imgTypeIndex = kcpicurl.lastIndexOf('.')
          var thumbnail = kcpicurl.substring(0, imgTypeIndex) + '_small' + kcpicurl.substring(imgTypeIndex)

          /*var infos = res.data.infos
          infos.forEach(e => {
            e.code = e.optioncontent.substring(0, e.optioncontent.indexOf('.'))
            e.option = e.optioncontent.substring(e.optioncontent.indexOf('.') + 1)
          })*/

          _t.meetingInfo = {
            meetingcode: res.data.meetingcode,
            meetingtitle: res.data.meetingtitle,
            casename: res.data.casename,
            questionname: res.data.questionname,
            teamname: res.data.teamname,
            logourl: res.data.logourl,
            kcpicurl: res.data.kcpicurl,
            thumbnail: thumbnail,
            seconds: res.data.seconds,
            qrcodecontent: res.data.qrcodecontent,
            infos: res.data.infos
          }
          _t.countdown = res.data.seconds

          
            _t.xaxis = []
            _t.meetingInfo.infos.forEach((element,i) => {
              //_t.xaxis.push(element.optioncontent.substring(0,1))
              _t.xaxis.push(_t.alloptions[i])
              _t.cdata.push('0.00%')
            });
              

          
          var img = new Image()
          img.src = _t.meetingInfo.kcpicurl
          img.onload = function () {
            _t.meetingInfo.thumbnail = _t.meetingInfo.kcpicurl
          }
          
          //_t.gotoStart()
          _t.gotoInterval()
        } else {
          _t.isHasM = false
        }
        
      }) 
    },
    gotoStart () {
      /*this.countdown = this.meetingInfo.seconds
      var _t = this
      this.axios.post('api/screen/begin', this.sparams)
        .then(function (res) {
          if (res.data.code == '200') {
            _t.isStarted = true
            _t.gotoInterval()
            window.onbeforeunload = function () {
              return '投票正在进行中，确认关闭浏览器？'
            }
          }
        })*/
    },
    gotoInterval () {
      var _t = this
      this.interval = setInterval(() => {
        if (_t.countdown <= 0) {
          clearInterval(_t.interval)
          _t.interval = null
          _t.isEnded = true
          window.onbeforeunload = function () {
            //return false
          }
        } else {
          _t.countdown--
        }
        _t.getScore()
        

      }, 1000);
    },
    getScore () {
      var _t = this
      this.axios.post('api/screen/getmeetingrealtimeinfo', this.sparams)
        .then(function (res) {
          if (res.data.code == 200) {
            _t.cdata = res.data.infos.map(t => {
              return t.count
            })
            var countnum = _t.cdata.reduce(function(p,c) {
              return p + c
            })
            _t.cdata = _t.cdata.map(function(c) {
              return (countnum > 0) ? (c / countnum * 100).toFixed(2) + '%' : '0.00%'
            })

            let max = _t.getmax(_t.cdata)
            let ystep = 20
            if (max < 150) {
              ystep = 30
            } else if (max < 250) {
              ystep = 50
            } else if (max < 500) {
              ystep = 100
            } else if (max < 1000) {
              ystep = 200
            } else if (max < 1500) {
              ystep = 300
            } else if (max < 2000) {
              ystep = 400
            } else if (max < 2500) {
              ystep = 500
            }
            //_t.yaxis = [0, ystep*1, ystep*2, ystep*3, ystep*4, ystep*5].reverse()
            
            // _t.initChart(data)
          }
        })

      
    },
    /*initChart (data) {
      console.log(data)
      let meetingchart = echarts.init(this.$refs.meetingchart);
      var option = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            xAxis: {
                data: ["A","B","C","D","E"]
            },
            yAxis: {},
            series: [{
                name: '选择人数',
                type: 'bar',
                data: data,
                barWidth : 40,
                itemStyle: {
                  normal: {
                    color: function(params) {
                        var colorList = ['#e48500', '#d30e00', '#a700da', '#0019d8', '#30dc00']
                        return colorList[params.dataIndex]
                    }
                  }
                }
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        meetingchart.setOption(option);
    },*/
    getmax (data) {
      let max = data[0]
      for (let i = 1; i < data.length; i++){
        if (data[i] > max) {
          max = data[i]
        }
      }
      return max
    }
  }
}
</script>
