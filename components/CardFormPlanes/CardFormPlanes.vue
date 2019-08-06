<template>
  <div class="text-xs-center">
    <v-dialog v-model="showModalAgregarEditar" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="#fc842e" dark v-on="on" v-show="create">Agregar Plan</v-btn>
        <v-btn color="#fc842e" icon dark v-on="on" v-show="edit">
          <v-icon class="tam-icon">fas fa-edit</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline" v-show="create">Nuevo Plan</span>
          <span class="headline" v-show="edit">Editar Plan</span>
        </v-card-title>
        <v-card-text>
          <v-layout wrap>
            <v-form ref="form">
              <v-container grid-list-xl>
                <v-layout wrap>
                  <v-flex xs12 >
                    <v-layout wrap>
                      <v-flex xs6 >
                        <v-text-field
                          label="Datos"
                          v-model="plan.data"
                          color="warning"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs6 >
                        <v-select
                          v-model="plan.dataType"
                          :items="['MB', 'GB']"
                          label="MB/GB"
                        ></v-select>
                      </v-flex>
                    </v-layout>
                  </v-flex>

                  <v-flex  xs12 >
                    <v-layout wrap>
                      <v-flex xs6 >
                        <v-text-field
                          label="Duración"
                          v-model="plan.duration"
                          color="warning"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs6 >
                        <v-select
                          v-model="plan.durationType"
                          :items="['Dias', 'Mes']"
                          label="Dias/Mes"
                        ></v-select>
                      </v-flex>
                    </v-layout>
                  </v-flex>

                  <v-flex xs12 >
                    <v-text-field
                      label="Costo (USD)"
                      v-model="plan.cost"
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
          <v-btn color="error" text @click="showModalAgregarEditar = false" dark>Cancelar</v-btn>
          <v-btn color="#fc842e" type="button" @click="onSubmit" dark v-show="create">Guardar Nuevo Plan</v-btn>
          <v-btn color="#fc842e" type="button" @click="onUpdate" dark v-show="edit">Actualizar Plan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  title: 'CardFormPlanes',
  props: ['create', 'edit', 'editPlan'],
  data() {
    return {
      plan: {
        id: '',
        data: '',
        dataType: '',
        duration: '',
        durationType: '',
        cost: null,
      },

      guardando: false,
      showModalAgregarEditar: false,
    }
  },
  mounted() {
    if (this.edit) {
      this.plan.id = this.editPlan.id
      this.plan.data = this.editPlan.data
      this.plan.dataType = this.editPlan.dataType
      this.plan.duration = this.editPlan.duration
      this.plan.durationType = this.editPlan.durationType
      this.plan.cost = this.editPlan.cost
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.showModalAgregarEditar = false
      this.guardando = true
      this.$store.dispatch('actionNuevoPlan', this.plan )
        .then( () => {
          this.guardando = false
          this.$store.dispatch('actionGetPlans')
            .then( () => {
              this.plan.id = ''
              this.plan.data = ''
              this.plan.dataType = ''
              this.plan.duration = ''
              this.plan.durationType = ''
              this.plan.cost = null
            })
        })
    },
    onUpdate(e) {
      e.preventDefault()
      this.showModalAgregarEditar = false
      this.guardando = true
      this.$store.dispatch('actionUpdatePlan', this.plan )
        .then( () => {
          console.log('Action then')
          this.guardando = false
          this.$store.dispatch('actionGetPlans')
            .then( () => {
              this.plan.id = ''
              this.plan.data = ''
              this.plan.dataType = ''
              this.plan.duration = ''
              this.plan.durationType = ''
              this.plan.cost = null
            })
        })
    },
  },
}
</script>