export default {
  methods: {
    scrollToTop(elementName) {
      let element = this.$refs['menu']
      // var top = element.offsetTop
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }
}
