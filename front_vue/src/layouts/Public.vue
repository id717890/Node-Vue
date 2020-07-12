<template>
  <transition mode="out-in">
    <router-view name="guest" />
  </transition>
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
    ...mapActions(['getAllConfigs', 'logout']),
    logoutApp() {
      this.logout()
      this.$router.push('/login')
    }
  },
  data: () => ({
    drawer: null
  })
}
</script>
