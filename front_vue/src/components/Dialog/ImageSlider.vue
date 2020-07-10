<template>
  <v-card class="pa-12">
    <v-card-text>
      <v-carousel class="photos-carousel" height="400" hide-delimiters>
        <v-carousel-item v-for="(item, index) in images" :key="index">
          <v-img :src="img(item.image)"></v-img>
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
