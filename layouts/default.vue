<template>
  <v-app :dark="modoOscuro" >
    <!-- Sidenav -->
    <Sidenav />
    
    <!-- Navbar -->
    <Navbar />
    
    <!-- Content -->
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <!-- Footer -->
    <v-footer fixed app >
      <span class="ml-3">CYBERTY<span class="text-naranja">X</span> &copy; {{year}}</span>
    </v-footer>
  </v-app>
</template>

<script>
// Imports
import { mapState } from 'vuex'

// Styles
import '@fortawesome/fontawesome-free/css/all.min.css'
import '../assets/style/material-icons.css'
import '../assets/style/global.css'

// Components
import Navbar from '../components/Navbar/Navbar.vue'
import Sidenav from '../components/Sidenav/Sidenav.vue'

export default {
  components: {
    Navbar,
    Sidenav,
  },
  data() {
    return {
      year: 0,
    }
  },
  mounted() {
    let date = new Date()
    this.year = date.getFullYear()
  },
  computed: {
      ...mapState(['modoOscuro']),
  },
}
</script>

