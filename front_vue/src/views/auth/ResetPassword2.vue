<template>
  <v-container fill-height>
    <v-row>
      <v-col cols="12" lg="6" offset-lg="3" md="8" offset-md="2" sm="12">
        <v-skeleton-loader
          :loading="loading"
          :transition="transition"
          height="94"
          type="list-item-two-line"
        >
          <section>
            <section v-if="showSuccess">
              <v-form lazy-validation v-model="form.valid" ref="form">
                <v-alert :value="showErrorAfterReset" type="error">
                  Ошибка при сбросе пароля. Попробуйте позже.
                </v-alert>
                <v-alert :value="showSuccessAfterReset" type="success">
                  Пароль успешно сохранен!
                </v-alert>
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
                <div class="d-flex">
                  <v-btn
                    large
                    color="success"
                    class=""
                    tile
                    :loading="loadingReset"
                    to="/login"
                  >
                    <v-icon class="mr-3">mdi-arrow-left</v-icon>
                    Назад
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    large
                    color="primary"
                    class=""
                    tile
                    @click="resetPaswword"
                    :disabled="!form.valid"
                    :loading="loadingReset"
                  >
                    <v-icon class="mr-3">mdi-save</v-icon>
                    Сохранить
                  </v-btn>
                </div>
              </v-form>
            </section>
            <v-alert :value="showError" type="error">
              Ошибка при верификации. Ссылка не действительна
            </v-alert>
          </section>
        </v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import context from '../../api/http-config'
export default {
  props: ['code'],
  data() {
    return {
      showSuccess: false,
      showError: false,
      showSuccessAfterReset: false,
      showErrorAfterReset: false,
      loading: false,
      loadingReset: false,
      transition: 'scale-transition',
      form: {
        password: null,
        password2: null,
        valid: true
      },
      passwordRules: [v => !!v || 'Password required'],
      passwordConfirmRules: [
        v => !!v || 'Password required',
        v => v === this.form.password || 'Password not equal'
      ]
    }
  },
  async created() {
    this.loading = true
    if (this.code) {
      setTimeout(() => {
        context
          .post('/api/auth/verifyReset', { token: this.code })
          .then(x => {
            this.loading = false
            if (x && x.status === 200) this.showSuccess = true
            else {
              this.showError = true
            }
          })
          .catch(x => {
            this.showError = true
            console.log(x)
            this.loading = false
          })
      }, 3000)
    }

    // let id = this.$route.query.id
    // let code = this.$route.query.code
    // console.log(id)
    // console.log(code)
    // if (id === null || code === null || id === '' || code === '') alert('Некорректная ссылка для восстановления')
    // else {
    //   // this.form.userId = id
    //   // this.form.code = code
    // }
  },
  methods: {
    resetPaswword() {
      if (this.$refs.form.validate()) {
        this.loadingReset = true
        context
          .post('/api/auth/resetPassword', {
            ...this.form,
            token: this.code
          })
          .then(x => {
            console.log(x)
            this.loadingReset = false
            this.showSuccessAfterReset = true
            this.showErrorAfterReset = false
          })
          .catch(x => {
            console.log(x)
            if (x.data.errors) {
              x.data.errors.forEach(error => this.$noty.error(error.msg))
            }
            if (x.data.msg) this.$noty.error(x.data.msg)
            this.loadingReset = false
            this.showSuccessAfterReset = false
            this.showErrorAfterReset = true
          })
      }
    }
  }
}
</script>

<style></style>
