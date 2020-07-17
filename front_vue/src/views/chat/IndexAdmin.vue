<template>
  <v-container fluid fill-height class="py-0">
    <v-row class="h100">
      <v-col md="4" cols="12">
        <v-card>
          <v-toolbar color="deep-purple accent-4" dark>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>New Chat</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-toolbar>

          <v-list subheader>
            <v-subheader>Recent chat</v-subheader>

            <v-list-item-group v-model="currentChatIndex">
              <v-list-item
                v-for="(chat, index) in chats"
                :key="chat.id"
                @click="selectChat(chat, index)"
              >
                <v-list-item-avatar>
                  <!-- <v-img :src="item.avatar"></v-img> -->
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title
                    v-text="chatUsers(chat.Chat.users)"
                  ></v-list-item-title>
                </v-list-item-content>

                <!-- <v-list-item-icon>
                <v-icon :color="item.active ? 'deep-purple accent-4' : 'grey'"
                  >mdi-message</v-icon
                >
              </v-list-item-icon> -->
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col md="8" cols="12" v-if="currentChat">
        <v-card class="pa-6">
          <p v-for="message in currentChat.Chat.messages" :key="message.id">
            <strong>{{ message.sender }}</strong>
            {{ message.text }}
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data: () => ({
    currentChat: null,
    currentChatIndex: null,
    items: [
      {
        active: true,
        title: 'Jason Oner',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
      },
      {
        active: true,
        title: 'Ranee Carlson',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'
      },
      {
        title: 'Cindy Baker',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'
      },
      {
        title: 'Ali Connors',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'
      }
    ]
  }),
  computed: {
    ...mapGetters(['userId']),
    ...mapState({
      chats: state => state.chat.allChats
    })
  },
  created() {},
  mounted() {},
  watch: {
    chats(value) {
      if (value && value.length > 0 && this.currentChat === null) {
        this.currentChat = value[0]
        this.currentChatIndex = 0
      }
    }
  },
  methods: {
    selectChat(chat, index) {
      this.currentChat = chat
      this.currentChatIndex = index
    },
    chatUsers(usersArray) {
      if (usersArray && usersArray.length > 0) {
        let result = usersArray.reduce((str, current, index, arr) => {
          if (Number(this.userId) !== Number(current.User.id)) {
            if (index === arr.length - 1) str += current.User.email
            else str += current.User.email + ', '
          }
          return str
        }, '')
        return result
      }
      return null
    }
  }
}
</script>
