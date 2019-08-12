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
                      <v-tooltip bottom v-if="!user.disabled">
                        <template v-slot:activator="{ on }">
                          <v-btn icon v-on="on" @click="disableUser(user.id)">
                            <v-icon class="icon-status text-disabled">fa fa-circle</v-icon>
                          </v-btn>
                        </template>
                        <span>Desactivar Usuario</span>
                      </v-tooltip>
                      <v-tooltip bottom v-if="user.disabled">
                        <template v-slot:activator="{ on }">
                          <v-btn icon v-on="on" @click="enableUser(user.id)">
                            <v-icon class="icon-status text-activated">fa fa-circle</v-icon>
                          </v-btn>
                        </template>
                        <span>Activar Usuario</span>
                      </v-tooltip>
                      <v-tooltip bottom v-if="!user.admin">
                        <template v-slot:activator="{ on }">
                          <v-btn icon v-on="on" @click="typeAdminUser(user.id)">
                            <v-icon class="icon-status text-admin">fa fa-star</v-icon>
                          </v-btn>
                        </template>
                        <span>Nombrar Administrador</span>
                      </v-tooltip>
                      <v-tooltip bottom v-if="user.admin">
                        <template v-slot:activator="{ on }">
                          <v-btn icon v-on="on" @click="typeDefaultUser(user.id)">
                            <v-icon class="icon-status text-default">fa fa-star</v-icon>
                          </v-btn>
                        </template>
                        <span>Quitar Administrador</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn icon v-on="on">
                            <v-icon class="icon-status text-naranja" @click="deleteUser(user.id)">fa fa-trash</v-icon>
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

        <div class="text-xs-center">
          <v-dialog v-model="showModalAdd" persistent max-width="600px">
            <template v-slot:activator="{ on }">
            <v-btn fab fixed bottom right class="btn-add-user" v-on="on">
              <v-icon>add</v-icon>
            </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Agregar Usuario</span>
              </v-card-title>
              <v-card-text>
                <v-layout wrap>
                  <v-flex md12 sm12 xs12>
                    <v-form ref="form">
                      <v-text-field
                        label="Usuario"
                        v-model="newUser.user"
                        color="light"
                        required
                      ></v-text-field>
                      <v-select
                        color="light"
                        v-model="newUser.profile"
                        :items="plansProfilesNames"
                        label="Plan"
                      ></v-select>
                    </v-form>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-actions class="pb-3">
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="showModalAdd = false" dark>Cancelar</v-btn>
                <v-btn color="#fc842e" type="button" @click="addUser" dark>Agregar Usuario</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>

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
      showModalAdd: false,
      newUser: {
        user: '',
        profile: '',
      }
    }
  },
  mounted() {
    this.$store.dispatch('actionGetUsers')
    this.$store.dispatch('actionPlanProfilesNames')
  },
  computed: {
      ...mapState(['modoOscuro', 'users', 'plansProfilesNames']),
  },
  methods: {
    disableUser(id) {
      this.$store.dispatch('actionDisableUser', id )
        .then( () => {
          this.$store.dispatch('actionGetUsers')
        })
    },
    enableUser(id) {
      this.$store.dispatch('actionEnableUser', id )
        .then( () => {
          this.$store.dispatch('actionGetUsers')
        })
    },
    typeAdminUser(id) {
      this.$store.dispatch('actionTypeAdminUser', id )
        .then( () => {
          this.$store.dispatch('actionGetUsers')
        })
    },
    typeDefaultUser(id) {
      this.$store.dispatch('actionTypeDefaultUser', id )
        .then( () => {
          this.$store.dispatch('actionGetUsers')
        })
    },
    addUser() {
      this.$store.dispatch('actionAddUser', this.newUser )
        .then( () => {
          this.$store.dispatch('actionGetUsers')
            .then( () => {
              this.newUser.user = ''
              this.newUser.profile = ''
              this.showModalAdd = false
            }) 
        })
    },
    deleteUser(id) {
      if (confirm('¿Desea eliminar este usuario permanentemente?')) {
        this.$store.dispatch('actionDeleteUser', id )
          .then( () => {
            this.$store.dispatch('actionGetUsers')
          })
      }
    },
  },
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
  .btn-add-user {
    background-color: #fc842e!important;
    color: #fff!important;
  }
</style>
