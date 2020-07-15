<template>
  <v-app id="inspire">
    <v-app-bar app clipped-right color="white" elevation="0">
      <v-app-bar-nav-icon @click.stop="left = !left"></v-app-bar-nav-icon>
      <v-toolbar-title>Node + Vue Application</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="left" fixed temporary>
      <v-list dense>
        <v-list-item to="/lk">
          <v-list-item-action>
            <v-icon>mdi-solar-panel</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/news">
          <v-list-item-action>
            <v-icon>mdi-newspaper</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>News</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/chat">
          <v-list-item-action>
            <v-icon>mdi-forum-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Chat</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <transition name="router-fade" mode="out-in">
        <router-view name="guest"></router-view>
      </transition>
    </v-main>

    <v-navigation-drawer
      v-model="right"
      fixed
      right
      temporary
    ></v-navigation-drawer>

    <v-footer app color="white" class="white--text">
      <span>Vuetify</span>
      <v-spacer></v-spacer>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    drawerRight: null,
    right: false,
    left: false
  }),
  async created() {
    this.$vuetify.theme.dark = false
    await this.getAllNewsAnonymous()
  },
  methods: {
    ...mapActions(['getAllNewsAnonymous'])
  }
}
</script>
