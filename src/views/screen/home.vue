<template>
  <div class="screen-box start-box" :style="{backgroundImage: 'url('+meetingInfo.thumbnail+')'}" v-if="isHasM">
    <div class="start-content">
      <!--<img :src="meetingInfo.logourl" :alt="meetingInfo.meetingtitle" class="logo">
      <h2>{{meetingInfo.meetingtitle}}</h2>-->
      <img src="../../assets/start.png" alt="" class="start-btn" @click="gotoReal">
    </div>
  </div>
  <div class="no-meeting" v-else>
    找不到对应的赛事信息
  </div>
</template>

<script>
import Qs from 'qs'
export default {
  name: 'meeting',
  data () {
    return {
      isHasM: false,
      isDis: false,
      meetingInfo : {},
      sparams: {
        meetingcode: '',
        teamcode: '',
        casecode: '',
        questioncode: ''
      },
      tparams: {
        client_id: 'sspc.poll.screen', 
        client_secret: 'w34e12w3e4r7u8jjiyfew2!', 
        grant_type: "password"
      }
    }
  },
  mounted () {
    
    this.getToken()
    if (this.$route.query.meetingcode) {
      this.isHasM = true
      this.sparams.meetingcode = this.$route.query.meetingcode
      this.sparams.teamcode = this.$route.query.teamcode
      this.sparams.casecode = this.$route.query.casecode
      this.sparams.questioncode = this.$route.query.questioncode

    } else {
      this.isHasM = false
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
        _t.getMeeting()
      })
    },
    getMeeting () {
      var _t = this
      this.axios.post('api/screen/getmeetinginfo', this.sparams).then(function (res) {
        if (res.data.code == '200') {
          var logourl = res.data.logourl
          var imgTypeIndex = logourl.lastIndexOf('.')
          var thumbnail = logourl.substring(0, imgTypeIndex) + '_small' + logourl.substring(imgTypeIndex)

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
          var img = new Image()
          img.src = _t.meetingInfo.kcpicurl
          img.onload = function () {
            _t.meetingInfo.thumbnail = _t.meetingInfo.logourl
          }
        } else {
          _t.isHasM = false
        }
      })
    },
    gotoReal () {
      var _t = this
      if (this.isDis) return
      this.isDis = true
      this.axios.post('api/screen/begin', this.sparams)
        .then(function (res) {
          if (res.data.code == '200') {
            /*_t.isStarted = true
            _t.gotoInterval()
            window.onbeforeunload = function () {
              return '投票正在进行中，确认关闭浏览器？'
            }*/
            _t.$router.replace({name: 'realtime', query: _t.sparams})
          } else {
            _t.isDis = false
            _t.$message.error('投票活动开始失败，请检查该投票活动状态');
          }
        }).catch(function(){
            _t.isDis = false
            _t.$message.error('请求失败');
        })

      
    }
  }
}
</script>

<style>
.start-content{
  position: relative;
  padding-top: 8rem;
  height: 100%;
  text-align: center;
  box-sizing: border-box;
}
.start-content .logo{
  max-height: 15rem;
  max-width: 30rem;
  width: 30%;
}
.start-content h2{
  padding: 5rem;
  font-size: 3rem;
  color: #fff;
  font-weight: bold;
  text-align: center;
  -webkit-text-stroke: 2px rgba(13, 105, 176, .7);
}
.start-content .start-btn{
  position: absolute;
  bottom: 10%;
  left: 50%;
  margin-left: -133px;
}
</style>
