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
                    <tr v-for="plan in plans" :key="plan.id" v-show="!plansEmpty.empty">
                      <th>{{ plan.data }} {{ plan.dataType }}</th>
                      <th>{{ plan.duration }} {{ plan.durationType }}</th>
                      <th>$ {{ plan.cost }}</th>
                      <th><span>{{ plan.dolartoday }} Bs.S</span></th>
                      <th v-if="user.admin == true" class="th-actions">
                        <div class="th-actions-container">

                          <CardFormPlanes :edit="edit" :editPlan="plan"/>

                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-btn icon v-on="on" @click="onDelete(plan.id)">
                                <v-icon class="tam-icon">fa fa-trash</v-icon>
                              </v-btn>
                            </template>
                            <span>Eliminar Plan</span>
                          </v-tooltip>
                        </div>
                      </th>
                    </tr>
                  </tbody>
                </table>
                <div class="text-xs-center pb-2 text-vacio" v-show="plansEmpty.empty" v-bind:class="{ textWhite: modoOscuro }">
                  <span>{{ plansEmpty.message }}</span>
                </div>
                <div class="text-xs-center pb-2 text-vacio" v-show="plansDolartodayError.error" v-bind:class="{ textWhite: modoOscuro }">
                  <span>{{ plansDolartodayError.message }}</span>
                </div>
              </div>
            </div>
          </v-card>
        </transition>
      </v-flex>
      <template v-if="user.admin == true">
        <v-flex md12 sm12 xs12>
          <CardFormPlanes :create="create"/>
        </v-flex>
      </template>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
import '../assets/style/table.css'

import CardFormPlanes from '../components/CardFormPlanes/CardFormPlanes.vue'

export default {
  name: 'Planes',
  middleware: 'session',
  head() {
    return {
      title: 'Cybertyx | Planes'
    }
  },
  components: {
    CardFormPlanes,
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
      loading: true,
      eliminando: false,
      showModalEliminar: false,
      edit: true,
      create: true,
    }
  },
  computed: {
      ...mapState(['modoOscuro', 'user', 'plans', 'plansEmpty', 'plansDolartodayError']),
  },
  mounted() {
    this.loading = true
    this.$store.dispatch('actionGetPlans')
      .then( () => {
        this.loading = false
      })
  },
  methods: {
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
    padding: 0px!important;
  }
  .th-actions-container {
    display: flex;
    justify-content: center;
  }
</style>

<style>
  .th-actions button {
    color: #fc842e!important;
    background: transparent!important;
  }
  .th-actions button i {
    font-size: 16px!important;
  }
</style>
