<template>
  <section>
    <modals-container />
    <transition name="router-fade" mode="out-in">
      <router-view />
    </transition>
  </section>
</template>

<script>
export default {
  sockets: {},
  props: {
    source: String
  },
  computed: {
    // ...mapGetters(['getConfig', 'isAuth']),
    // cfgTheme() {
    //   return this.getConfig('theme')
    // },
    // cfgColor() {
    //   return this.getConfig('color')
    // },
    // cfgNavbar() {
    //   return this.getConfig('navbar')
    // },
    // cfgFooter() {
    //   return this.getConfig('footer')
    // }
  },
  async created() {},
  watch: {},
  methods: {},
  data: () => ({
    drawer: null
  })
}
</script>
