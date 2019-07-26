<template>
  <v-toolbar fixed app >
    <v-toolbar-side-icon @click="toogleSidenav" />
    <v-toolbar-title>
      CYBERTY<span class="text-naranja">X</span>
    </v-toolbar-title>
    <v-spacer />

    <v-toolbar-items>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
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

      <v-dialog width="500" v-model="modalCerrarSesion">
        <template v-slot:activator="{ on: dialog }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn icon v-on="{ ...tooltip, ...dialog }">
                <v-icon class="tam-icon">fas fa-sign-out-alt</v-icon>
              </v-btn>
            </template>
            <span>Cerrar</span>
          </v-tooltip>
        </template>
        <v-card>
          <v-card-title class="justify-center">
            <h2>¿Desea Cerrar Sesión?</h2>
          </v-card-title>
          <v-card-actions class="justify-center">
            <v-btn text @click="cerrarModalSesion = false" >
              Cancelar
            </v-btn>
            <v-btn color="#fc842e" text @click="logout" >
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
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'Navbar',
  computed: {
    ...mapState(['modalCerrarSesion']),
  },
  methods: {
    ...mapMutations(['toogleOscuro', 'toogleSidenav', 'cerrarModalSesion', 'logout']),
  },
}
</script>

<style scoped>
  .tam-icon {
    font-size: 18px;
  }
</style>
