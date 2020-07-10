import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({
      loading: state => state.loading.loading
    })
  },
  methods: {
    ...mapActions(['setLoading']),
    setLoad(value) {
      this.setLoading(value)
    }
  }
}
