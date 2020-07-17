<template>
  <v-form lazy-validation v-model="form.valid" ref="form">
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="py-0">
          <h2>
            <v-icon>mdi-folder-multiple-image</v-icon>
            Новый альбом
          </h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="6" md="8" sm="12" cols="12">
          <v-text-field
            label="Название"
            v-model="form.name"
            required
            :rules="textField"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="6" md="8" sm="12" cols="12" class="mb-0 pb-0">
          <v-textarea
            outlined
            label="Описание"
            v-model="form.description"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="6" md="8" sm="12" cols="12" class="d-flex">
          <v-btn color="secondary" large to="/lk/albums">
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
import { mapActions } from 'vuex'

export default {
  mixins: [loading],
  data: () => ({
    textField: [v => !!v || 'Обязательное поле'],
    form: {
      valid: true,
      name: '',
      description: ''
    }
  }),
  created() {},
  mounted() {},
  computed: {},
  methods: {
    ...mapActions(['createAlbum']),
    save() {
      this.setLoad(true)
      if (this.$refs.form.validate()) {
        this.createAlbum(this.form)
      } else this.setLoad(false)
    }
  }
}
</script>
