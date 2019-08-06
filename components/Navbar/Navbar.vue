<template>
  <v-toolbar fixed app >
    <v-toolbar-side-icon @click="mutateToogleSidenav" />
    <v-toolbar-title>
      CYBERTY<span class="text-naranja">X</span>
    </v-toolbar-title>
    <v-spacer />

    <v-toolbar-items>
      <v-menu>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-on="on" >
            <v-icon class="tam-icon">fas fa-language</v-icon>
          </v-btn>
        </template>

        <v-list class="v-list-language">
          <ul class="list-language">
            <li>
              <button>Español | Spanish</button>
            </li>
            <li>
              <button>English | Ingles</button>
            </li>
          </ul>
        </v-list>
      </v-menu>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon @click="mutateToogleOscuro" v-on="on">
            <v-icon class="tam-icon">fas fa-moon</v-icon>
          </v-btn>
        </template>
        <span>Modo Oscuro</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon class="tam-icon">fas fa-user</v-icon>
          </v-btn>
        </template>
        <span>Perfil de Usuario</span>
      </v-tooltip>

      <v-dialog width="500" v-model="modal">
        <template v-slot:activator="{ on: dialog }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn icon v-on="{ ...tooltip, ...dialog }">
                <v-icon class="tam-icon">fas fa-sign-out-alt</v-icon>
              </v-btn>
            </template>
            <span>Cerrar Sesión</span>
          </v-tooltip>
        </template>
        <v-card class="pb-2">
          <v-card-title class="justify-center">
            <h2>¿Desea Cerrar Sesión?</h2>
          </v-card-title>
          <v-card-actions class="justify-center">
            <v-btn text @click="modal = false" >
              Cancelar
            </v-btn>
            <v-btn color="#fc842e" dark text @click="handleLogout" >
              Cerrar sesión
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
// Imports
import { mapMutations } from 'vuex'

export default {
  name: 'Navbar',
  data() {
    return {
      modal: false,
    }
  },
  computed: {
    cerrarModal: {
      get () {
        return this.$store.state.modalCerrarSesion
      },
      set () {
        console.log('Modal')
      }
    }
  },
  methods: {
    ...mapMutations(['mutateToogleSidenav', 'mutateToogleOscuro']),
    handleLogout() {
      this.$store.commit('mutateLogout', this.$router)
    },
  },
}
</script>

<style scoped>
  .tam-icon {
    font-size: 18px;
  }
  .v-list-language {
    padding: 0px!important;
  }
  .list-language {
    list-style:none;
    width: 150px;
    padding: 0px;
  }
  .list-language button {
    width: 100%;
    padding: 5px;
  }
  .list-language button:hover {
    background-color: #fc842e;
    color: #fff;
  }
  .list-language button:active {
    background-color: #f7a828;
  }
</style>
