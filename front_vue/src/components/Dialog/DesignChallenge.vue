<template>
  <v-card class="v-application">
    <v-form lazy-validation v-model="form.valid" ref="form">
      <v-card-title v-if="title">
        <h3>{{ title }}</h3>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="pb-0">
            <v-text-field
              label="Ваше имя"
              required
              outlined
              :rules="textField"
              v-model="form.name"
            ></v-text-field>
            <v-text-field
              label="Телефон"
              required
              outlined
              :rules="textField"
              v-model="form.phone"
            ></v-text-field>
            <v-textarea
              required
              outlined
              :rules="textField"
              v-model="form.text"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="py-0">
            <v-btn
              class="mr-4"
              large
              text
              fab
              title="Прикрепить файл"
              @click="$refs.file.click()"
            >
              <v-icon>mdi-paperclip</v-icon>
            </v-btn>
            <input
              style="display: none"
              ref="file"
              type="file"
              @change="attachFile"
            />
            <span>Прикрепить файла до <b class="red--text">20Мб*</b></span>
          </v-col>
        </v-row>
        <v-row v-if="form.path">
          <v-col cols="12" v-if="!checkSize">
            <v-alert type="error">Превышен размер файла</v-alert>
          </v-col>
          <v-col cols="12">{{ form.path }}</v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="pb-6 px-6 pt-0">
        <v-spacer></v-spacer>
        <v-btn
          @click="sendForm"
          :disabled="!form.valid || !checkSize"
          :loading="loading"
          large
          color="success"
          class="px-10 w100"
        >
          <v-icon class="mr-6">mdi-send</v-icon>
          Отправить заявку
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import context from '../../api/api'
export default {
  props: ['title'],
  data: () => ({
    loading: false,
    form: {
      valid: true,
      name: '',
      phone: '',
      text: '',
      file: null,
      path: ''
    },
    textField: [v => !!v || 'Обязательное поле']
  }),
  computed: {
    checkSize() {
      if (this.form.file) {
        if (this.form.file.size > 20 * 1024 * 1024) return false
      }
      return true
    }
  },
  methods: {
    attachFile(e) {
      this.form.file = event.target.files[0]
      this.form.path = e.target.value
    },
    sendForm() {
      if (this.$refs.form.validate()) {
        this.loading = true
        let fd = new FormData()
        fd.append('file', this.form.file)
        fd.append('name', this.form.name)
        fd.append('phone', this.form.phone)
        fd.append('text', this.form.text)
        context
          .post('api/callback/design', fd)
          .then(x => {
            this.loading = false
            this.$refs.form.reset()
            this.$emit('close')
          })
          .catch(x => {
            console.log(x)
            this.loading = false
          })
      }
    }
  }
}
</script>
