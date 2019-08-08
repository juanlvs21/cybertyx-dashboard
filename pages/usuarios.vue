<template>
  <v-container grid-list-md text-center justify-center>
    <v-layout wrap>
      <v-flex md12 sm12 xs12>
        <v-card>
          <div class="v-data-table elevation-1 theme--light">
            <div class="text-md-center">
              <h2 class="padding-10px">Lista de Usuarios</h2>
            </div>
            <div class="v-data-table__wrapper">
              <table class="table table-bordered table-hover" v-bind:class="{ tableOscuro: modoOscuro }">
                <thead>
                  <tr>
                    <th v-for="(title, i) in tableHeader" :key="i">
                      <h3 class="table-header">{{ title }}</h3>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in users" :key="user.id">
                    <th>
                        <v-tooltip bottom v-if="!user.disabled">
                          <template v-slot:activator="{ on }">
                            <v-icon class="icon-status text-activated" dark v-on="on">fas fa-circle</v-icon>
                          </template>
                          <span>Activado</span>
                        </v-tooltip>
                        <v-tooltip bottom v-if="user.disabled">
                          <template v-slot:activator="{ on }">
                            <v-icon class="icon-status text-disabled" dark v-on="on">fas fa-circle</v-icon>
                          </template>
                          <span>Desactivado</span>
                        </v-tooltip>
                        <v-tooltip bottom v-if="user.admin">
                          <template v-slot:activator="{ on }">
                            <v-icon class="icon-status text-admin" dark v-on="on">fas fa-star</v-icon>
                          </template>
                          <span>Administrador</span>
                        </v-tooltip>
                        <v-tooltip bottom v-if="!user.admin">
                          <template v-slot:activator="{ on }">
                            <v-icon class="icon-status text-default" dark v-on="on">fas fa-star</v-icon>
                          </template>
                          <span>Usuario</span>
                        </v-tooltip>
                    </th>
                    <th>{{ user.name }}</th>
                    <th>{{ user.profile }}</th>
                    <th>{{ user.user }}</th>
                    <th class="th-actions">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn icon v-on="on">
                            <v-icon class="icon-status">fa fa-trash</v-icon>
                          </v-btn>
                        </template>
                        <span>Eliminar Usuario</span>
                      </v-tooltip>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import '../assets/style/table.css'

export default {
  name: 'Usuarios',
  middleware: 'session',
  head() {
    return {
      title: 'Cybertyx | Usuarios'
    }
  },
  data() {
    return {
      tableHeader: ['Estado', 'Nombre', 'Perfil', 'Usuario', 'Acciones'],
      page: 1,
    }
  },
  mounted() {
    this.$store.dispatch('actionGetUsers')
  },
  computed: {
      ...mapState(['modoOscuro', 'users']),
  }
}
</script>

<style scoped>
  .icon-status {
    font-size: 14px!important;
    padding: 0px 5px;
  }
  .text-activated {
    color: #4caf50!important;
  }
  .text-disabled {
    color: #f44336!important;
  }
  .text-admin {
    color: #2196f3!important;
  }
  .text-default {
    color: #9e9e9e!important;
  }
  .th-actions {
    padding:0px!important;
  }
  .th-actions button{
    margin:0px!important;
  }
</style>
