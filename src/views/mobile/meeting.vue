<template>
  <div class="meeting-box">
    <div class="meeting-content" v-if="isHasM">
      <div class="meeting-top" ref="thumbnail">
        <img :src="meetingInfo.thumbnail" alt="" class="meeting-top-bg">
        <div class="meeting-header">
          <!--<img :src="meetingInfo.logourl" alt="">-->
          <!--<div class="meeting-logo">
            
          </div>
          <div class="meeting-zzs">
            <img src="../../assets/zzs.png" alt="">
          </div>-->
        </div>
        <div class="meeting-title">
          <!--<h1>{{meetingInfo.meetingname}}</h1>-->
          <h3><span>{{meetingInfo.teamname}}</span><span>{{meetingInfo.casename}}</span></h3>
        </div>
        
      </div>
      <div class="meeting-area"  v-if="meetingInfo.questionname">
        <dl>
          <dt><p>{{meetingInfo.questionname}}</p></dt>
          <dd v-for="(item,index) in meetingInfo.infos">
            <div class="radio-box">
              <div class="radio">
                <input type="radio" :id="item.optioncode" :value="item.optioncode" v-model="optioncode"><span></span>
              </div>
              <label :for="item.optioncode">
                <i>{{alloptions[index]}}、</i>
                <span>{{item.optioncontent}}</span>
              </label>
            </div>
          </dd>
        </dl>
        <button class="btn" @click="gotoVote" :disabled="isDis || !optioncode">提交</button>
      </div>
    </div>
    




    <div class="dialog" v-show="isShow || !isHasM">
      <div class="dialog-mask"></div>
      <div class="dialog-box">
        <img src="../../assets/wks.png" alt="">
        <p>{{msg}}</p>
        <button class="btn" @click="isShow = false">关闭</button>
      </div>
    </div>
    <div class="dialog" v-show="isVoted">
      <div class="dialog-mask"></div>
      <div class="dialog-box">
        <img src="../../assets/yjs.png" alt="">
        <p>{{vmsg}}</p>
        <button class="btn" @click="isVoted = false">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
import Qs from 'qs'
export default {
  name: 'meeting',
  data () {
    return {
      tparams: {
        client_id: 'sspc.poll.mobile', 
        client_secret: 'w34e12w3e4r7u8jjiyfew1!', 
        grant_type: "password"
      },
      sparams: {
        meetingcode: ''
      },
      isShow: false,
      isVoted: false,
      isDis: false,
      isHasM: false,
      meetingInfo: {},
      msg: '投票活动未开始，请稍后',
      vmsg: '投票已完成，请耐心等待活动结果！',
      optioncode: '',
      alloptions: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
    }
  },
  mounted () {
    this.getToken()
    if (this.$route.query.meetingcode){
      this.sparams.meetingcode = this.$route.query.meetingcode
      this.isHasM = true
    } else {
      this.isHasM = false
      this.msg = '找不到对应的赛事信息'
    }
  },
  methods: {
    getToken (isVote, flag) {
      var _t = this
      this.axios.post('access_token', this.tparams, {
        transformRequest: [function (data) {
          // 对 data 进行任意转换处理
          return Qs.stringify(data);
        }]
      }).then(function (res) {
        _t.$store.commit('initToken',res.data)
        _t.axios.defaults.headers.common['Authorization'] = "Bearer " + res.data.access_token
        if (isVote) {
          _t.gotoVote(flag)
        } else {
          _t.getInfo()
        }
        
      })
    },
    getInfo () {
      var _t = this
      this.axios.post('api/mobile/getmeetinginfo', this.sparams)
        .then(function(res) {
          if (res.data.code == '200') {
            var logourl = res.data.logourl
            var imgTypeIndex = logourl.lastIndexOf('.')
            var thumbnail = logourl.substring(0, imgTypeIndex) + '_small' + logourl.substring(imgTypeIndex)
            /*var infos = res.data.infos
            infos.forEach(e => {
              e.code = e.optioncontent.substring(0, e.optioncontent.indexOf('.'))
              e.option = e.optioncontent.substring(e.optioncontent.indexOf('.') + 1)
            })*/

            _t.meetingInfo = {
              meetingcode: res.data.meetingcode,
              staus: res.data.staus,
              stausremark: res.data.stausremark,
              meetingname: res.data.meetingname,
              teamname: res.data.teamname,
              casename: res.data.casename,
              questionname: res.data.questionname,
              logourl: res.data.logourl,
              kcpicurl: res.data.kcpicurl,
              thumbnail: thumbnail,
              infos: res.data.infos
            }
            var img = new Image()
            img.src = _t.meetingInfo.logourl
            img.onload = function () {
              _t.meetingInfo.thumbnail = _t.meetingInfo.logourl
            }
            if (_t.meetingInfo.staus != 2) {
              _t.isShow = true
              _t.msg = _t.meetingInfo.stausremark
            }
          } else if (res.data.code == '304') {
            _t.getToken()
          } else {
            _t.isHasM = false
            _t.msg = res.data.errormsg ? res.data.errormsg : '找不到对应的赛事信息'
          }
          
        })
    },
    gotoVote (flag) {
      //flag 1红 2蓝
      var _t = this
      this.isDis = true
      this.axios.post('api/mobile/submitmeetingticket', {
        meetingcode: this.meetingInfo.meetingcode,
        optioncode: this.optioncode
      }).then(function(res) {
        if (res.data.code == '404') {
          _t.isShow = true
          _t.msg = res.data.errormsg
          _t.isDis = false
        } else if (res.data.code == '304') {
          _t.getToken(true, flag)
          _t.isDis = false
        }  else {
          _t.isVoted = true
          if (res.data.code != '200') {
            _t.vmsg = res.data.errormsg
          } else {
            _t.vmsg = res.data.successmsg ? res.data.successmsg : '投票已完成，请耐心等待投票结果！'
          }
        }
      }).catch(function(){
        _t.isDis = false
        _t.isShow = true
        _t.msg = '投票失败，请重试'
      })
    }
  }
}
</script>

<style>
.meeting-box, .meeting-content{
  height: 100%;
  background: #fff;
  overflow: auto;
}
.meeting-top{
  position: relative;
  overflow: hidden;
}
.meeting-top-bg{
  width: 100%;
}
.meeting-title{
  position: absolute;
  bottom: 1rem;
  width: 100%;
  text-align: center;
}
.meeting-title h1{
  padding-bottom: .5rem;
  font-size: 2.2rem;
  color: #0d69b0;
  text-shadow: 1px 0px 0px #fff, 0px 1px 0px #fff, -1px 0px 0px #fff, 0px -1px 0px #fff
}
.meeting-title h3{
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 1.4rem;
  color: #f2f26f;
}
.meeting-title h3 span{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient: vertical;
        
  width: 50%;
  padding: 0px .5rem;
  box-lines: 2;
}
.meeting-header{
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  padding-top: 2rem;
  text-align: center;
}
.meeting-header img{
  width: 70%;
  max-height: 10rem;
}
.meeting-area{
  padding: .5rem 1rem;
}
.meeting-area dl{
  margin-bottom: 2rem;
}
.meeting-area dt{
  padding-bottom: 1rem;
  font-size: 1.4rem;
  color: #0068b6;
  border-bottom: solid 1px #eee;
  
  
}
.meeting-area dt p{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp:3;
  -webkit-box-orient: vertical;
}
.meeting-area dd{
  margin: 0px;
  padding: 1rem;
  font-size: 1.3rem;
}
.meeting-area dd label{
  position: relative;
  padding-left: 1.5rem;
  line-height: 1.5;
}
.meeting-area dd label i{
  position: absolute;
  left: 0px;
  top: 0px;
  font-style: normal;
}
.meeting-area dd label span{
  
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient: vertical;
}
.radio-box{
  display: flex;
}
.radio-box label{
  display: inline-block;
  max-width: 80%;
}
.radio{
  margin-right: 1rem;
  position: relative;
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  vertical-align: middle;
}
.radio input{
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.radio span{
  display: inline-block;
  width: 100%;
  height: 100%;
  border: solid 1px #d7d7d7;
  background: #f9f9f9;
  border-radius: 50%;
}
.radio input:checked + span{
  background: url('../../assets/gx.png') no-repeat center #0068b6;
  background-size: 70%;
  border-color: #0068b6;
}
.btn{
  display: block;
  margin: auto;
  width: 70%; 
  height: 3.6rem;
  font-size: 1.6rem;
  background: #2a72d6;
  border-radius: 3.6rem;
  border: 0px;
  box-shadow: 0px 0px 3px #0068b6;
  color: #fff
}
.btn:disabled{
  background: #ccc;
  box-shadow: 0px 0px 3px #aaa
}

.dialog,
.dialog-mask{
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
}
.dialog-mask{
  background: rgba(0,0,0,.3)
}
.dialog-box{
  position: fixed;
  left: 5rem;
  right: 5rem;
  top: 20%;
  padding: 2rem;
  height: 60%;
  background: #fff;
  border-radius: 1rem;
  text-align: center;
  box-sizing: border-box;
}
.dialog-box img{
  margin-top: 1rem;
  max-width: 80%;
  max-height: 50%;
}
.dialog-box p{
  font-size: 1.6rem;
  padding: 1rem 0px 2rem;
}
</style>
