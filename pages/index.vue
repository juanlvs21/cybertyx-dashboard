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
            <h3 class="text-naranja">{{ user.bytesOut }}</h3>
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
    <v-layout>
      <v-flex md12 sm12 xs12>
        <v-card>
            <div class="text-md-center">
              <h2 class="padding-10px">Avisos y Noticias</h2>
            </div>
          <v-container class="sin-padding-top">
            <v-layout wrap>

              <v-flex md6 sm12 xs12>
              <v-card color="#fc842e" dark >
                <v-card-text class="white--text">
                  <div class="headline mb-2">Cantv esta presentando fallas</div>
                  Actualmente el servicio de cantv esta presentando fallas, 
                  pronto podrá volver a disfrutar de nuestros servicios
                </v-card-text>
              </v-card>
              </v-flex>

            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>  
import { mapState } from 'vuex'

export default {
  name: 'Inicio',
  middleware: 'auth',
  head() {
    return {
      title: 'Cybertyx | Inicio'
    }
  },
  computed: {
    ...mapState(['user']),
  },
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
  .sin-padding-top {
    padding-top: 0px
  }
</style>

