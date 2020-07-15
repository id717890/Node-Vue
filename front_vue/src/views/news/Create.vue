<template>
  <v-form lazy-validation v-model="form.valid" ref="form">
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="py-0">
          <h2>
            <v-icon>mdi-newspaper</v-icon>
            Новая новость
          </h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="6" md="8" sm="12" cols="12">
          <v-text-field
            label="Заголовок"
            v-model="form.title"
            required
            :rules="textField"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="6" md="8" sm="12" cols="12">
          <v-btn @click="$refs.file.click()" dark class="mb-5 w100">
            <v-icon>mdi-image</v-icon>
            Загрузить изображение</v-btn
          >
          <input
            style="display: none"
            ref="file"
            type="file"
            accept="image/jpeg"
            @change="upload"
          />
          <div v-if="form.image">
            <img
              :src="img(form.image)"
              style="width: 100%; border-radius: 5px"
            />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="6" md="8" sm="12" cols="12">
          <tteditor @editorChanged="textChanged($event)" :text="null" />
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="6" md="8" sm="12" cols="12" class="d-flex">
          <v-btn color="secondary" large to="/lk/news">
            <v-icon class="mr-2">mdi-undo</v-icon>
            Назад
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            large
            :loading="loading"
            @click.prevent="save"
            :disabled="!form.valid"
          >
            <v-icon class="mr-2">mdi-content-save</v-icon>
            Сохранить
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import loading from '../../mixins/loading'
import image from '../../mixins/image'
import { mapActions } from 'vuex'
// import config from '../../init/config'
import TtEditor from '../../components/TipTapEditor'

export default {
  mixins: [loading, image],
  components: {
    tteditor: TtEditor
  },
  data: () => ({
    textField: [v => !!v || 'Обязательное поле'],
    form: {
      valid: true,
      title: '',
      text: '',
      image: ''
    }
  }),
  created() {},
  mounted() {
    this.setLoad(false)
  },
  computed: {},
  methods: {
    ...mapActions(['createNews', 'uploadImage']),
    textChanged(event) {
      this.form.text = event
    },
    upload(event) {
      const file = event.target.files[0]
      let fd = new FormData()
      fd.append('prefix', 'news')
      fd.append('image', file)
      this.uploadImage(fd)
        .then(x => {
          if (x.data && x.data.msg) {
            this.$noty.error(x.data.msg)
          } else {
            if (x.filename) this.form.image = x.filename
          }
        })
        .catch(x => console.log(x))
    },
    save() {
      this.setLoad(true)
      if (this.$refs.form.validate()) {
        this.createNews(this.form)
      } else this.setLoad(false)
    }
  }
}
</script>
