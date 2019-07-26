<template>
  <v-navigation-drawer v-model="toogleSidenav" fixed app id="sidenav">
    <v-list>
      <v-list-tile v-for="(item, i) in itemsNav" :key="i" :to="item.to" router exact>
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.title"/>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Imports 
import { mapState } from 'vuex'

export default {
  name: 'Sidenav',
  data() {
    return {
      sidenav: false,
    }
  },
  computed: {
    ...mapState(['showSidenav']),
    toogleSidenav: {
      get () {
        return this.$store.state.showSidenav
      },
      set () {
        // if (this.sidenav) {
        //   vuethis.$store.commit('toogleSidenav')
        // }
        console.log('Set')
      }
    }
  },
  data() {
    return {
      itemsNav: [
        {
          icon: 'fas fa-home',
          title: 'Tablero',
          to: '/'
        },
        {
          icon: 'fas fa-hand-holding-usd',
          title: 'Planes',
          to: '/planes'
        },
        {
          icon: 'far fa-envelope',
          title: 'Mensajes',
          to: '/mensajes'
        }
      ],
    }
  },
  // mounted() {
  //   let vuethis = this
  //   window.addEventListener('click', function(e){   
  //     if (document.getElementById('sidenav').contains(e.target)){
  //       console.log('if')
  //     } else{
  //       if (vuethis.showSidenav) {
  //         vuethis.sidenav = true
  //       }
  //     }
  //   });
  // },
}
</script>