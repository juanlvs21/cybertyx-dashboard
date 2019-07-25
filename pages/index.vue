<template>
  <v-container grid-list-md text-center justify-center>
    <v-layout wrap>
      <v-flex md4 sm12 xs12>
        <v-card class="text-md-center">
          <v-card-text>
            <p>Plan Contratado</p>
            <h3>5 GB</h3>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex md4 sm12 xs12>
        <v-card class="text-md-center">
          <v-card-text>
            <p>Datos Consumidos</p>
            <h3>344.43 MB</h3>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex md4 sm12 xs12>
        <v-card class="text-md-center">
          <v-card-text>
            <p>Próximo Pago</p>
            <h3>01/03/2019</h3>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: 'Administracion',
  head() {
    return {
      title: 'Cybertyx | Administración'
    }
  },
}
</script>

<style scoped>
  .card-dashboard {

  }
</style>

