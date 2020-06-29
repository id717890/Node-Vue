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
            <v-alert :value="showSuccess" type="success">
              Ваша учетная запись успешно подтверждена. Теперь вы можете
              авторизоваться!
            </v-alert>
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
      loading: false,
      transition: 'scale-transition'
    }
  },
  async created() {
    this.loading = true
    if (this.code) {
      setTimeout(() => {
        context
          .post('/api/auth/verifyRegister', { token: this.code })
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
  mounted() {
    // this.$store
    //   .dispatch('confirmation', this.code)
    //   .then(() => {
    //     this.showSuccess = true
    //   })
    //   .catch(() => {
    //     this.showError = true
    //   })
  }
}
</script>

<style></style>
