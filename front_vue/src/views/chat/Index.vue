<template>
  <component :is="layout"></component>
</template>

<script>
import ChatAdminPage from './IndexAdmin'
import ChatUserPage from './IndexGuest'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    'chat-admin': ChatAdminPage,
    'chat-user': ChatUserPage
  },
  async created() {
    await this.getAllChats()
  },
  computed: {
    ...mapGetters(['isAdmin']),
    layout() {
      if (this.isAdmin === true) return 'chat-admin'
      return 'chat-user'
    }
  },
  methods: {
    ...mapActions(['getAllChats'])
  }
}
</script>
