<template>
  <v-app id="app" dark>
    <v-container fill-height>
      <v-row>
        <v-col cols="12" lg="6" offset-lg="3" md="8" offset-md="2" sm="12">
          <v-alert :value="showSuccess" type="success">
            На указанную почту выслана ссылка для восстановления пароля!
          </v-alert>
          <v-alert :value="showError" type="error">
            Ошибка при попытке выслать на почту ссылку для восстановления
          </v-alert>
          <v-form lazy-validation v-model="form.valid" ref="form">
            <v-text-field
              label="E-mail"
              v-model="form.email"
              required
              :rules="emailRules"
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
          <v-btn
            large
            color="primary"
            class=""
            tile
            @click="reset"
            :disabled="loading"
          >
            <v-icon class="mr-3">mdi-email</v-icon>
            Восстановить пароль
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import context from '../../api/http-config'

export default {
  data() {
    return {
      loading: false,
      showError: false,
      showSuccess: false,
      form: {
        valid: true,
        email: 'jusupovz@gmail.com'
      },
      emailRules: [
        v => !!v || 'E-mail required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  methods: {
    reset(e) {
      e.preventDefault()
      this.loading = true
      if (this.$refs.form.validate()) {
        context
          .post('/api/auth/resetPasswordSendToken', this.form)
          .then(() => {
            this.loading = false
            this.showSuccess = true
            this.showError = false
          })
          .catch(x => {
            this.loading = false
            this.showSuccess = false
            this.showError = true
            console.log(x)
          })
      }
    }
  }
}
</script>
