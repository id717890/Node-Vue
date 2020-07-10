<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="12" cols="12">
        <h1 class="text-center mb-5">{{ product.name }}</h1>
        <p class="font-weight-bold" v-if="product.tech !== null">
          {{ product.tech }}
        </p>
        <p v-if="product.text !== null">{{ product.text }}</p>
        <code class="mb-5" v-if="product.site !== null"
          ><a :href="product.site" target="_blank">Перейти на сайт</a></code
        >
        <v-carousel
          :show-arrows="true"
          :hide-delimiters="true"
          :cycle="true"
          :interval="66000"
          height="auto"
        >
          <v-carousel-item v-for="(img, index) in product.img" :key="index">
            <v-img :src="img"></v-img>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pb-0">
        <div class="d-flex">
          <div class="flex-grow-1"></div>
          <v-btn large @click="cancel"
            ><i class="fa fa-times fa-2x"></i>Close</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ['product'],
  data: () => ({}),
  methods: {
    cancel() {
      this.$emit('close')
    }
  }
}
</script>
