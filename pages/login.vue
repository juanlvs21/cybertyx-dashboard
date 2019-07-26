<template>
    <v-container text-center>
      <v-layout align-center justify-center row fill-height>
        <v-flex md5>
          <v-card>
            <div class="text-md-center">
              <img src="/cybertyx-logo.png" class="cybertyx-logo-sesion" alt="Cybertyx">
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Login',
    layout: 'session',
    head() {
      return {
        title: 'Cybertyx | Iniciar Sesión'
      }
    },
}
</script>

<style scoped>
  .cybertyx-logo-sesion{
    width: 100px;
    margin: 10px;
  }
</style>
