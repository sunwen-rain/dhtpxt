<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import './assets/common.css'
export default {
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {
    getToken () {
      this.axios.get('/access_token')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>
