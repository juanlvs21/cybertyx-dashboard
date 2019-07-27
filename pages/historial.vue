<template>
  <v-container grid-list-md text-center justify-center>
    <v-layout wrap>
      <v-flex md12 sm12 xs12>
        <v-card>
          <div class="v-data-table elevation-1 theme--light">
            <div class="text-md-center">
              <h2 class="padding-10px">Historial de Transacciones</h2>
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
  name: 'Historial',
  // middleware: 'auth',
  head() {
    return {
      title: 'Cybertyx | Historial'
    }
  },
  data () {
    return {
      tableHeader: ['Fecha', 'Plan', 'Costo'],
      TableItems: [
        { fecha: '01/02/2019', plan: '50 GB', costo: '5$', },
        { fecha: '01/01/2019', plan: '200 GB', costo: '20$' },
        { fecha: '01/12/2018', plan: '350 GB', costo: '30$' },
        { fecha: '01/11/2018', plan: '200 GB', costo: '20$' },
        { fecha: '01/10/2018', plan: '30 GB', costo: '3$' },
      ],
      page: 1,
    }
  },
  computed: {
      ...mapState(['modoOscuro']),
  }
}
</script>
