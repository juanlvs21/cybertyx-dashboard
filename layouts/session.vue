<template>
    <div id="session-container">
        <nuxt />
    </div>
</template>

<script>
import '../assets/style/global.css'
import '../assets/style/transitions.css'

export default {
    mounted() {
      let container = document.getElementById('session-container')
      let height = window.innerHeight

      container.style.height = `${height}px`

      let body = document.querySelector('body')

      body.style.background = '#f7a828'
      body.style.background = '-webkit-linear-gradient(to right, #fc842e, #f7a828)'
      body.style.background = 'linear-gradient(to right, #fc842e, #f7a828)'
    },
}
</script>

<style scoped>
    #session-container {
        display: flex!important;
        justify-content: center;
        align-items: center;
    }
</style>
