<template>
  <v-card class="v-application">
    <v-card-text>
      <v-btn
        style="position:absolute; right: 35px; top: 15px; z-index: 100"
        fab
        color="primary"
        @click="$emit('close')"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-carousel class="photos-carousel" hide-delimiters height="100vh">
        <v-carousel-item v-for="(item, index) in images" :key="index">
          <div class="h100" style="">
            <v-img contain height="93%" :src="img(item.image)"></v-img>
            <div class="text-center">{{ item.name }}</div>
          </div>
        </v-carousel-item>
      </v-carousel>
    </v-card-text>
  </v-card>
</template>

<script>
import imageMixin from '../../mixins/image'
export default {
  mixins: [imageMixin],
  props: ['images'],
  data: () => ({}),
  methods: {
    cancel() {
      this.$emit('close')
    }
  }
}
</script>
