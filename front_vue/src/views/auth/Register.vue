<template>
  <v-app id="app" dark>
    <v-container fill-height>
      <v-row>
        <v-col cols="12" lg="6" offset-lg="3" md="8" offset-md="2" sm="12">
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
            <v-text-field
              label="Пароль еще раз"
              type="password"
              v-model="form.password2"
              required
              :rules="passwordConfirmRules"
            ></v-text-field>
          </v-form>
        </v-col>
        <v-col
          cols="12"
          lg="6"
          class="d-flex"
          offset-lg="3"
          md="8"
          offset-md="2"
          sm="12"
        >
          <v-btn large color="success" class="px-10" tile to="/login">
            <v-icon class="mr-3">mdi-login</v-icon>
            Вход</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn large color="primary" class="" tile @click="regUser">
            <v-icon class="mr-3">mdi-account-circle</v-icon>
            Регистрация
          </v-btn>
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
        password: '123',
        password2: '123'
      },
      emailRules: [
        v => !!v || 'E-mail required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [v => !!v || 'Password required'],
      passwordConfirmRules: [
        v => !!v || 'Password required',
        v => v === this.form.password || 'Password not equal'
      ]
    }
  },
  methods: {
    ...mapActions(['register']),
    regUser(e) {
      e.preventDefault()
      if (this.$refs.form.validate()) {
        this.register(this.form)
      }
    }
  }
}
</script>
