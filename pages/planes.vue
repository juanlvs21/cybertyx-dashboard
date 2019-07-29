<template>
  <v-container grid-list-md text-center justify-center>
    <v-layout wrap>
      <template v-if="user.admin == true">
        <v-flex md12 sm12 xs12>
          <div class="text-md-center text-sm-center text-xs-center">
            <transition name="fade-left">
              <v-btn color="#fc842e" v-show="!agregarPlan" @click="agregarPlan = true" dark>Añadir Plan</v-btn>
            </transition>
          </div>
        </v-flex>
        <v-flex md12 sm12 xs12>
          <div class="text-md-center text-sm-center text-xs-center">
            <transition name="fade-up">
              <v-btn color="error" v-show="agregarPlan" @click="agregarPlan = false" dark>Cancelar</v-btn>
            </transition>
          </div>
        </v-flex>
        <v-flex md12 sm12 xs12>
          <transition name="fade-up">
            <v-card class="mt-3" v-show="agregarPlan">
              <v-card-text>Hola</v-card-text>
              <v-card-text>Hola</v-card-text>
              <v-card-text>Hola</v-card-text>
              <v-card-text>Hola</v-card-text>
              <v-card-text>Hola</v-card-text>
            </v-card>
          </transition>
        </v-flex>
      </template>
      <v-flex md12 sm12 xs12>
        <transition name="fade-left">
          <v-card v-show="!agregarPlan">
            <div class="v-data-table elevation-1 theme--light">
              <div class="text-md-center">
                <h2 class="padding-10px">Lista de Planes</h2>
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
                      <th>{{ item.datos }}</th>
                      <th>{{ item.duracion }}</th>
                      <th>{{ item.costo }}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </v-card>
        </transition>
      </v-flex>
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
      tableHeader: ['Datos', 'Duración', 'Costo'],
      TableItems: [
        { datos: '350GB', duracion: '1 Mes', costo: '30$', },
        { datos: '200GB', duracion: '1 Mes', costo: '20$' },
        { datos: '100GB', duracion: '1 Mes', costo: '10$' },
        { datos: '50GB', duracion: '1 Mes', costo: '5$' },
        { datos: '30GB', duracion: '1 Mes', costo: '3$' },
      ],
      agregarPlan: false,      
    }
  },
  computed: {
      ...mapState(['modoOscuro', 'user']),
  },
}
</script>