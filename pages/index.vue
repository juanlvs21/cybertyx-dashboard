<template>
  <v-container grid-list-md text-center justify-center>
    <v-layout wrap>
      <v-flex md4 sm12 xs12>
        <v-card class="text-md-center">
          <v-card-text class=" text-estadistica">
            <span>Plan Contratado</span>
            <h3 class="text-naranja">5 GB</h3>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex md4 sm12 xs12>
        <v-card class="text-md-center">
          <v-card-text class=" text-estadistica">
            <span>Datos Consumidos</span>
            <h3 class="text-naranja">344.43 MB</h3>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex md4 sm12 xs12>
        <v-card class="text-md-center">
          <v-card-text class=" text-estadistica">
            <span>Próximo Pago</span>
            <h3 class="text-naranja">01/03/2019</h3>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout wrap>
      <v-flex md12 sm12 xs12>
        <v-card>
          <div class="v-data-table elevation-1 theme--light">
            <div class="text-md-center">
              <h2 class="historial-titulo">Historial de Transacciones</h2>
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
                  <tr v-for="(item, i) in TableItems" :key="i">
                    <th>{{ item.fecha }}</th>
                    <th>{{ item.plan }}</th>
                    <th>{{ item.costo }}</th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="v-data-footer pb-3">
              <div class="text-md-center">
                <v-pagination
                  v-model="page"
                  :length="6"
                  color="#fb862e"
                ></v-pagination>
              </div>
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
    name: 'Tablero',
    head() {
      return {
        title: 'Cybertyx | Tablero'
      }
    },
    data () {
      return {
        tableHeader: ['Fecha', 'Plan', 'Costo'],
        TableItems: [
          { fecha: '01/02/2019', plan: '5 GB', costo: '5$', },
          { fecha: '01/01/2019', plan: '10 GB', costo: '10$' },
          { fecha: '01/12/2018', plan: '15 GB', costo: '15$' },
          { fecha: '01/11/2018', plan: '10 GB', costo: '10$' },
          { fecha: '01/10/2018', plan: '5 GB', costo: '5$' },
        ],
        page: 1,
      }
    },
    computed: {
        ...mapState(['modoOscuro']),
    }
  }
</script>

<style scoped>
  .text-estadistica span {
    font-size: 18px;
  }
  .text-estadistica h3 {
    font-weight: bold!important;
    font-size: 24px;
  }
  .historial-titulo{
    padding: 5px;
  }
</style>

