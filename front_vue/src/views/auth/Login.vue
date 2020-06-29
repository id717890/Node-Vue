<template>
  <v-app id="app" dark>
    <v-container fill-height>
      <v-row>
        <v-col cols="12" lg="8" offset-lg="2" md="8" offset-md="2" sm="12">
          <v-form lazy-validation v-model="form.valid" ref="form">
            <v-text-field
              label="E-mail"
              v-model="form.email"
              required
              :rules="passwordRules"
            ></v-text-field>
            <v-text-field
              label="Пароль"
              type="password"
              v-model="form.password"
              required
              :rules="passwordRules"
            ></v-text-field>
          </v-form>
        </v-col>
        <v-col
          cols="12"
          lg="8"
          class="d-flex"
          offset-lg="2"
          md="8"
          offset-md="2"
          sm="12"
        >
          <v-btn large color="primary" class="mr-3" tile to="/register">
            <v-icon class="mr-3">mdi-account-circle</v-icon>
            Регистрация
          </v-btn>
          <v-btn large color="primary" class="" tile to="/forgot">
            <v-icon class="mr-3">mdi-lock-reset</v-icon>
            Забыл пароль?
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            large
            color="success"
            class="px-10"
            tile
            @click="signin"
            :disabled="!form.valid"
          >
            <v-icon class="mr-3">mdi-login</v-icon>
            Вход</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      form: {
        valid: true,
        email: 'jusupovz@gmail.com',
        password: '123'
      },
      emailRules: [
        v => !!v || 'E-mail required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [v => !!v || 'Password required']
    }
  },
  created() {
    // this.$vuetify.theme.dark = false
  },
  methods: {
    ...mapActions(['signUserIn']),
    signin(e) {
      e.preventDefault()
      if (this.$refs.form.validate()) {
        this.signUserIn(this.form)
      }
    }
  }
}
</script>
