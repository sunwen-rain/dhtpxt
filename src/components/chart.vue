<template>
  <div class="chart-box">
    <div class="yaxis">
      <span v-for="item in yaxis" :key="item">{{item}}</span>
    </div>
    <div class="xaxis">
      <span v-for="item in xaxis" :key="item" :style="{'width': 100 / xaxis.length + '%' }">{{item}}</span>
    </div>
    <div class="chart-content">
      <div class="bar-box" v-for="(item,index) in data" :style="{height: item / total * 100 + '%','width': 100 / xaxis.length + '%',left: 100 / xaxis.length * index + '%'}">
        <div class="bar"></div>  
        <span>{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chart',
  data () {
    var total = parseInt(this.yaxis[0])
    return {
      //xaxis: ['A', 'B', 'C', 'D', 'E']
      total: total
    }
  },
  props: {
    xaxis: {
      type: Array,
      default () {
        return ['A', 'B', 'C', 'D', 'E']
      }
    },
    yaxis: {
      type: Array,
      default () {
        return ['0', '200', '400', '600', '800', '1000'].reverse()
      }
    },
    data: {
      type: Array,
      default () {
        return [100,200,300,400,500]
      } 
    }
  },
  watch: {
    yaxis (n) {
      this.total = parseInt(this.yaxis[0])
    }
  }
}
</script>

<style>
.chart-box{
  position: relative;
  width: 100%;
  background: linear-gradient(#ccc 1px, transparent 0);
  background-size: 20% 20%;
  background-position: left bottom;
  height: 80%;
  font-size: .8rem;
}
.chart-box:before{
  content: '';
  position: absolute;
  left: 5px;
  top: -5px;
  bottom: 0px;
  width: 1px;
  background: #ccc;
}
.xaxis{
  position: absolute;
  left: .5rem;
  right: 0px;
  bottom: -1rem;
  font-size: 0px;
}
.xaxis span{
  display: inline-block;
  width: 20%;
  text-align: center;
  font-size: .8rem
}
.yaxis{
  position: absolute;
  left: -1.5rem;
  top: -.6rem;
  height: 100%;
  
}
.yaxis span{
  display: block;
  text-align: right;
  height: 20%;
}
.chart-content {
  position: relative;
  margin-left: .5rem;
  height: 100%;
}
.bar-box{
  position: absolute;
  bottom: .2rem;
  width: 20%;
  min-height: 1px;
  z-index: 9;
}
.bar{
  position: relative;
  margin: auto;
  transform: translate(-.4rem, 0px);
  max-width: 4rem;
  width: 30%;
  height: 100%;
}
.bar::before{
  content: '';
  position: absolute;
  top: -.2rem;
  right: -.4rem;
  width: .4rem;
  height: 100%;
  transform: skew(0deg, -45deg);
}
.bar::after{
  content: '';
  position: absolute;
  top: -.4rem;
  right: -.2rem;
  width: 100%;
  height: .4rem;
  transform: skew(-45deg);
}
.bar-box:nth-child(5n+1) .bar{
  background: linear-gradient(#ffd191, #cf7700);
}
.bar-box:nth-child(5n+1) .bar::before{
  background: linear-gradient(#e98500, #6f410b);
}
.bar-box:nth-child(5n+1) .bar::after{
  background: linear-gradient(#ffd191, #ffa932);
}

.bar-box:nth-child(5n+2) .bar{
  background: linear-gradient(#ff968f, #d10b00);
}
.bar-box:nth-child(5n+2) .bar::before{
  background: linear-gradient(#e80e00, #700500);
}
.bar-box:nth-child(5n+2) .bar::after{
  background: linear-gradient(#ff968f, #ff493b);
}

.bar-box:nth-child(5n+3) .bar{
  background: linear-gradient(#e693ff, #9500cd);
}
.bar-box:nth-child(5n+3) .bar::before{
  background: linear-gradient(#ae00e7, #590076);
}
.bar-box:nth-child(5n+3) .bar::after{
  background: linear-gradient(#e693ff, #d03fff);
}

.bar-box:nth-child(5n+4) .bar{
  background: linear-gradient(#8b99ff, #001ad6);
}
.bar-box:nth-child(5n+4) .bar::before{
  background: linear-gradient(#0f2bdc, #001170);
}
.bar-box:nth-child(5n+4) .bar::after{
  background: linear-gradient(#8b99ff, #475dff);
}

.bar-box:nth-child(5n) .bar{
  background: linear-gradient(#9cff81, #41d21e);
}
.bar-box:nth-child(5n) .bar::before{
  background: linear-gradient(#3fd70e, #538533);
}
.bar-box:nth-child(5n) .bar::after{
  background: linear-gradient(#9cff81, #4cff1b);
}

/*.bar::after{
  content: '';
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 10px;
  background-image: inherit;
  background-color: #fff;
  background-size: 32px auto;
  background-repeat: no-repeat;
  background-position: top center;
}*/
.bar-box span{
  position: absolute;
  top: -1.4rem;
  left: 0px;
  display: block;
  width: 100%;
  text-align: center;
}
</style>
