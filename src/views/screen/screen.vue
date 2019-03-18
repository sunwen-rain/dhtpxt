<template>
  <router-view></router-view>
</template>
<script>
export default {
  name: 'screen'
}
</script>

<style>

.screen-box{
  background-size: 100% 100%;
  background-attachment: fixed;
  font-family: '黑体';
  background-image: url(../../assets/bg.png);
  background-attachment: fixed;
  overflow: auto;
}
.realtime-box{
  position: relative;
  height: 100%;
  box-sizing: border-box;
}

.meeting-top{
  font-size: 2.5rem;
  color: #014999;
  font-weight: bold;
  text-align: center;
  -webkit-text-stroke: 1px #fff;
}
.meeting-top img{
  margin-right: 1rem;
  height: 5.5rem;
  vertical-align: middle;
}
.meeting-top span{
  display: inline-block;
  padding-top: 10px; 
  line-height: 109px;
}
.ticket-box{
  padding-top: 11rem;
  padding-bottom: 2rem;
  position: relative;
  height: 100%;
  box-sizing: border-box;
}

.meeting-score{
  padding: 0px 40px;
  width: 82%;
  height: 100%;
  box-sizing: border-box;
}
.meeting-score-box{
  border-radius: 2rem;
  background: #fff;
  height: 100%;
}
.meeting-content{
  position: relative;
  height: calc(100% - 5rem);
  display: flex;
  align-items: flex-start;
}
.meeting-question{
  padding: 1rem 2rem;
  font-size: 1.4rem;
  border-bottom: solid 1px #acacac;
  
  
}
.meeting-question p{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient: vertical;
}
.meeting-question img{
  vertical-align: middle;
}
.meeting-options{
  padding-bottom: 1rem;
  font-size: 1.2rem;
  line-height: 1.5;
  width: 50%;
  box-sizing: border-box;
}
.meeting-options li{
  position: relative;
  margin: 1rem 5rem 1rem 2rem;
  word-wrap: break-word;
}
.meeting-options li i{
  position: absolute;
  left: 0px;
  top: 0px;
  font-style: normal;
}
.meeting-options li p{
  padding-left: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient: vertical;
}

.echart-box{
  position: absolute;
  right: 2rem;
  top: 1.5rem;
  width: 50%;
  height: 100%;
}
.echart-box .meetingchart{
  width: 100%;
  height: 100%;
}

.meeting-state{
  position: absolute;
  right: 2rem;
  bottom: 2rem;
  width: 15%;
  font-size: 4rem;
  color: #db9b0e;
  text-align: center;
  vertical-align: bottom;
}
.meeting-state span{
  display: inline-block;
  position: relative;
  padding-bottom: 2rem;
}
.meeting-state span.end{
  font-size: 2rem;
}
.meeting-state .ewm{
  width: 100%;
  padding: .2rem .2rem 0rem;
  background: #fff;
  vertical-align: bottom;
}
.meeting-state i{
  font-style: normal;
}
.meeting-state .end{
  font-size: 2.3rem;
}

.no-meeting{
  color: #fff;
  font-size: 2rem;
  text-align: center;
  padding-top: 15rem;
}
.cdnum-box{
  white-space: nowrap;
}
</style>
