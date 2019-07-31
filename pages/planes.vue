<template>
  <v-container grid-list-md text-center justify-center>
    <v-layout wrap>
      <v-flex md12 sm12 xs12>
        <transition name="fade-right">
          <v-card>
            <div class="v-data-table elevation-1 theme--light">
              <div class="text-md-center">
                <h2 class="padding-10px">Lista de Planes</h2>
              </div>
              <div class="text-xs-center pb-3" v-show="loading">
                <v-progress-circular
                  indeterminate
                  color="#fc842e"
                ></v-progress-circular>
              </div>
              <div class="v-data-table__wrapper" v-show="!loading">
                <table class="table table-bordered table-hover" v-bind:class="{ tableOscuro: modoOscuro }">
                  <thead>
                    <tr>
                      <th v-for="(title, i) in tableHeader" :key="i">
                        <h3 class="table-header">{{ title }}</h3>
                      </th>
                      <th v-if="user.admin == true"><h3 class="table-header">Acciones</h3></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(plan, i) in plans" :key="i" v-show="!plansEmpty.empty">
                      <th>{{ plan.data }}</th>
                      <th>{{ plan.duration }}</th>
                      <th>$ {{ plan.cost }}</th>
                      <th><span>{{ plan.dolartoday }} Bs.S</span></th>
                      <th v-if="user.admin == true" class="th-actions">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on" @click="onDelete(plan.id)">
                              <v-icon class="tam-icon">fa fa-trash</v-icon>
                            </v-btn>
                          </template>
                          <span>Eliminar Plan</span>
                        </v-tooltip>

                      </th>
                    </tr>
                  </tbody>
                </table>
                <div class="text-xs-center pb-2 text-vacio" v-show="plansEmpty.empty" v-bind:class="{ textWhite: modoOscuro }">
                  <span>{{ plansEmpty.message }}</span>
                </div>
              </div>
            </div>
          </v-card>
        </transition>
      </v-flex>
      <template v-if="user.admin == true">
        <v-flex md12 sm12 xs12>
          <div class="text-xs-center">
            <v-dialog v-model="showModalAgregar" persistent max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn color="#fc842e" dark v-on="on">Agregar Plan</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Nuevo Plan</span>
                </v-card-title>
                <v-card-text>
                  <v-layout wrap>
                    <!-- <v-form ref="form" @submit="onSubmit" @rest="onReset"> -->
                    <v-form ref="form">
                      <v-container grid-list-xl>
                        <v-layout wrap>
                          <v-flex xs12 md4 >
                            <v-text-field
                              label="Datos (MB/GB)"
                              v-model="nuevoPlan.data"
                              color="warning"
                              required
                            ></v-text-field>
                          </v-flex>

                          <v-flex  xs12 md4 >
                            <v-text-field
                              label="Duración (Dias/Mes)"
                              v-model="nuevoPlan.duration"
                              color="warning"
                              required
                            ></v-text-field>
                          </v-flex>

                          <v-flex xs12 md4 >
                            <v-text-field
                              label="Costo (USD)"
                              v-model="nuevoPlan.cost"
                              color="warning"
                              required
                            ></v-text-field>
                          </v-flex>

                          <v-flex xs12 class="d-flex justify-center">
                            <transition name="fade">
                                <v-progress-circular 
                                  v-show="guardando"
                                  indeterminate
                                  color="#fc842e"
                                ></v-progress-circular>
                            </transition>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-form>
                  </v-layout>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error" text @click="showModalAgregar = false" dark>Cancelar</v-btn>
                  <v-btn color="#fc842e" type="button" @click="onSubmit" dark>Guardar Nuevo Plan</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-flex>
      </template>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
import '../assets/style/table.css'

export default {
  name: 'Planes',
  middleware: 'auth',
  head() {
    return {
      title: 'Cybertyx | Planes'
    }
  },
  data () {
    return {
      tableHeader: ['Datos', 'Duración', 'Costo (USD)', 'Costo (Bs.S)'],
      TableItems: [
        { data: '350GB', duration: '1 Mes', cost: '30$', },
        { data: '200GB', duration: '1 Mes', cost: '20$' },
        { data: '100GB', duration: '1 Mes', cost: '10$' },
        { data: '50GB', duration: '1 Mes', cost: '5$' },
        { data: '30GB', duration: '1 Mes', cost: '3$' },
      ],
      nuevoPlan: {
        data: '',
        duration: '',
        cost: null,
      },
      loading: true,
      guardando: false,
      eliminando: false,
      showModalAgregar: false,
      showModalEliminar: false,
    }
  },
  computed: {
      ...mapState(['modoOscuro', 'user', 'plans', 'plansEmpty']),
  },
  mounted() {
    this.loading = true
    this.$store.dispatch('actionGetPlans')
      .then( () => {
        this.loading = false
      })
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.guardando = true
      this.$store.dispatch('actionNuevoPlan', this.nuevoPlan )
        .then( () => {
          this.guardando = false
          this.loading = true
          this.showModalAgregar = false
          this.$store.dispatch('actionGetPlans')
            .then( () => {
              this.nuevoPlan.data = ''
              this.nuevoPlan.duration = ''
              this.nuevoPlan.cost = null

              this.loading = false
            })
        })
    },
    onDelete(id) { 
      if (confirm('¿Desea eliminar este plan?')) {
        this.eliminando = true
        this.loading = true
        this.$store.dispatch('actionDeletePlan', id)
          .then( () => {
            this.eliminando = false
            this.$store.dispatch('actionGetPlans')
              .then( () => {
                this.showModalEliminar = false
                this.loading = false
              })
          })
      }
    }
  },
}
</script>

<style scoped>
  .theme--light {
    border-color: #fc842e!important;
    color: #fc842e!important;
  }
  .text-vacio {
    color: #000;
  }
  .text-vacio span{
    font-weight: normal!important;
    font-size: 16px;
  }
  .textWhite {
    color: #fff;
  }
  .th-actions {
    padding: 0px;
  }
  .th-actions button {
    margin: 0px;
  }
  .th-actions button i {
    font-size: 16px!important;
  }
</style>