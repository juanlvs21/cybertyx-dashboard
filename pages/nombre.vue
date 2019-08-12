<template>
  <div>
    <div class="text-xs-center">
      <h1>Bienvenido, aún no has registrador ningún nombre</h1>      
      <h2>Es necesario registrarlo para poder continuar</h2>
    </div>
    <v-card  class="mt-4 pa-4">
      <v-form ref="form" @submit="onSubmit">
        <v-text-field
          label="Nombre"
          v-model="formUser.name"
          color="light"
          required
          class="input-cybertyx"
        ></v-text-field>
        <div class="text-xs-center">
          <v-btn color="#fc842e" type="submit" dark >Registrar nombre</v-btn>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'RegistrarNombre',
  middleware: 'session',
  head() {
    return {
      title: 'Cybertyx | Registrar Nombre'
    }
  },
  data() {
    return {
      formUser: {
        name: null,
      },
    }
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      let updateUser = {...this.user}
      updateUser.name = this.formUser.name
      this.$store.dispatch('actionUpdateUser', updateUser )
    }
  },
}
</script>
