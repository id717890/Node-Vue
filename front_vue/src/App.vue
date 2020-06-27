<template>
  <v-app id="inspire">
    <modals-container />
    <v-navigation-drawer v-if="isAuth" v-model="drawer" app>
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/login">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="logout">
          <v-list-item-action>
            <v-icon>mdi-email</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      :color="cfgColor"
      dark
      v-if="isAuth && cfgNavbar && cfgNavbar == 1"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!-- <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col class="text-center">
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-btn :href="source" icon large target="_blank" v-on="on">
                  <v-icon large>mdi-code-tags</v-icon>
                </v-btn>
              </template>
              <span>Source</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container> -->
      <transition mode="out-in">
        <router-view />
      </transition>
    </v-main>
    <v-footer :color="cfgColor" app v-if="cfgFooter && cfgFooter == 1">
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    source: String
  },
  computed: {
    ...mapGetters(['getConfig', 'isAuth']),
    cfgTheme() {
      return this.getConfig('theme')
    },
    cfgColor() {
      return this.getConfig('color')
    },
    cfgNavbar() {
      return this.getConfig('navbar')
    },
    cfgFooter() {
      return this.getConfig('footer')
    }
  },
  async created() {
    this.getAllConfigs()
  },
  watch: {
    cfgTheme(value) {
      if (value) this.$vuetify.theme.dark = this.cfgTheme === 'dark'
    }
  },
  methods: {
    ...mapActions(['getAllConfigs', 'logout'])
  },
  data: () => ({
    drawer: null
  })
}
</script>
