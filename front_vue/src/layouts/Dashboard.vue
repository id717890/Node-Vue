<template>
  <component :is="layout"></component>
</template>

<script>
import DashboardAdmin from './DashboardAdmin'
import DashboardUser from './DashboardUser'
import { mapGetters } from 'vuex'
export default {
  components: {
    'daschboard-admin': DashboardAdmin,
    'daschboard-user': DashboardUser
  },
  computed: {
    ...mapGetters(['getRole']),
    layout() {
      if (!this.getRole) return 'daschboard-user'
      return 'daschboard-' + this.getRole
    }
  }
}
</script>
