<template>
  <v-app :dark="modoOscuro" >
    <!-- <link href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css" rel="stylesheet"> -->
    <!-- Sidenav -->
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-tile v-for="(item, i) in itemsNav" :key="i" :to="item.to" router exact>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    
    <!-- Navbar -->
    <v-toolbar :clipped-left="clipped" fixed app >
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <!-- <v-toolbar-title v-text="title" /> -->
      <v-toolbar-title>
        CYBERTY<span class="text-naranja">X</span>
      </v-toolbar-title>
      <v-spacer />

      <v-toolbar-items>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon @click="toogleOscuro" v-on="on">
              <v-icon class="tam-icon">fas fa-user</v-icon>
            </v-btn>
          </template>
          <span>Perfil de Usuario</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon @click="toogleOscuro" v-on="on">
              <v-icon class="tam-icon">fas fa-moon</v-icon>
            </v-btn>
          </template>
          <span>Modo Oscuro</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon @click="logout" v-on="on">
              <v-icon class="tam-icon">fas fa-sign-out-alt</v-icon>
            </v-btn>
          </template>
          <span>Cerrar Sesión</span>
        </v-tooltip>

      </v-toolbar-items>
    </v-toolbar>
    
    <!-- Content -->
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <!-- Footer -->
    <v-footer :fixed="fixed" app >
      <span class="ml-3">CYBERTY<span class="text-naranja">X</span> &copy; {{year}}</span>
    </v-footer>

  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '../assets/style/material-icons.css'
import '../assets/style/global.css'

export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      itemsNav: [
        {
          icon: 'fas fa-home',
          title: 'Tablero',
          to: '/'
        },
        {
          icon: 'fas fa-hand-holding-usd',
          title: 'Planes',
          to: '/planes'
        },
        {
          icon: 'far fa-envelope',
          title: 'Mensajes',
          to: '/mensajes'
        }
      ],
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
  methods: {
    toogleOscuro() {
      this.$store.commit('toogleOscuro')
    },
    logout() {
      this.$router.push({ path: 'login' })
    },
  },
}
</script>

<style scoped>
  .tam-icon {
    font-size: 18px;
  }
  .btn-user-navbar {
    border: transparent!important;
    box-shadow: 0;
  }
</style>

