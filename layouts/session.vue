<template>
    <div id="session-container">
        <nuxt />
    </div>
</template>

<script>
export default {
    mounted() {
      let container = document.getElementById('session-container')
      let height = window.innerHeight

      container.style.height = `${height}px`
    },
}
</script>

<style scoped>
    #session-container {
        display: flex!important;
        justify-content: center;
        align-items: center;
        background: #f7a828;
        background: -webkit-linear-gradient(to right, #fc842e, #f7a828);  
        background: linear-gradient(to right, #fc842e, #f7a828); 
    }
</style>
