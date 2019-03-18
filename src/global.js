import Vue from 'vue'
import axios from axios
axios.defaults.baseURL = (process.env.NODE_ENV === 'production' ? '' : '/capi')
Vue.prototype.axios = axios


var globalData = {
  GET: function () {
    this.axios.get
  }
}

export default globalData