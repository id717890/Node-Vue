<template>
  <v-card class="v-application">
    <v-form lazy-validation v-model="form.valid" ref="form">
      <v-card-title>
        <v-row v-if="discount">
          <v-col cols="12" class="px-6">
            <div class="d-flex flex-row flex-nowrap align-center">
              <v-img max-width="100" :src="img(discount.image)"></v-img>
              <div class="t6 ml-5">{{ discount.title }}</div>
            </div>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text class="ma-0">
        <v-col cols="12">
          <v-text-field
            label="Ваше имя *"
            outlined
            v-model="form.name"
            required
            :rules="textField"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="Телефон *"
            outlined
            v-model="form.phone"
            required
            :rules="textField"
          ></v-text-field>
        </v-col>
      </v-card-text>
      <v-card-actions class="pb-6 px-8 pt-0">
        <v-spacer></v-spacer>
        <v-btn
          @click="sendForm"
          :disabled="!form.valid"
          large
          color="success"
          class="px-10"
        >
          <v-icon>mdi-check</v-icon>
          Использовать
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import imageMix from '../../mixins/image'
export default {
  props: ['discount'],
  mixins: [imageMix],
  data: () => ({
    form: {
      valid: true,
      name: '',
      phone: ''
    },
    textField: [v => !!v || 'Обязательное поле']
  }),
  methods: {
    sendForm() {
      if (this.$refs.form.validate()) {
      }
    }
  }
}
</script>

<style></style>
