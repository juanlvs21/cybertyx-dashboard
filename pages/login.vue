<template>
    <v-container text-center>
      <v-layout align-center justify-center row fill-height>
        <v-flex md5>
          <v-card class="container">
            <div class="text-md-center">
              <img src="/cybertyx-logo.png" class="cybertyx-logo-sesion" alt="Cybertyx">

              <v-form ref="form" @submit="onSubmit" @rest="onReset">
                <v-text-field
                  v-model="user.user"
                  label="Usuario"
                  color="warning"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="user.password"
                  label="Contraseña"
                  type="password"
                  color="warning"
                  required
                ></v-text-field>

                <transition name="fade">
                  <v-alert type="error" color="red" elevation="2" class="border-radius-3px" v-show="errorLogin.error">
                    {{ errorLogin.message }}
                  </v-alert>
                </transition>
                
                <transition name="fade">
                  <v-progress-linear v-show="loading" class="border-radius-3px" indeterminate color="#fc842e"></v-progress-linear>
                </transition>

                <div class="justify-center">
                  <v-btn type="submit" dark color="#fc842e">Iniciar Sesión</v-btn>
                </div>

              </v-form>
             
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Login',
    layout: 'session',
    head() {
      return {
        title: 'Cybertyx | Iniciar Sesión'
      }
    },
    data() {
      return {
        user: {
          user: '',
          password: '',
        },
        loading: false,
      }
    },
    computed: {
      ...mapState(['errorLogin']),
    },
    methods: {
      onSubmit(e) {
        e.preventDefault()
        this.loading = true
        this.$store.dispatch('actionLogin', this.user )
          .then( () => {
            this.loading = false
            if (this.errorLogin.error) {
              setTimeout(() => {
                this.$store.dispatch('actionLoginClearError')
              }, 5000);
            } else {
              this.$router.push('/')
            }
          })
      },
      onReset(e) {
        e.preventDefault()
        this.usuario.usuario = ''
        this.usuario.contra= ''
      },
    },
}
</script>

<style scoped>
  .cybertyx-logo-sesion{
    width: 100px;
    margin: 10px;
  }
  .theme--light.v-card {
    border-color: #fc842e!important;
    color: #fc842e!important;
  }
  .border-radius-3px {
    border-radius: 3px;
  }
</style>

<style>
  .v-form .v-label--active {
    color: #fc842e!important;
  }
</style>