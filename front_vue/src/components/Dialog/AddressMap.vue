<template>
  <v-card class="v-application h100">
    <div class="w100 d-flex flex-column  h100">
      <v-card-text class="flex-grow-1 d-flex my-0 pl-0 py-0">
        <!-- <v-img src="~@/assets/img/joma-map.webp" aspect-ratio="1.6" class="map">
        </v-img> -->
        <div
          class="d-flex pa-12"
          style="position:absolute; right: 0; top: 15px"
        >
          <v-spacer></v-spacer>
          <v-btn fab color="orange" dark class="mr-3" @click="print">
            <v-icon>mdi-printer</v-icon>
          </v-btn>
          <v-btn fab color="primary" @click="$emit('close')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A65622dca02b6643717de04c5237e3fec1ef211101f2ffbfb43a92ed2ff579f36&amp;source=constructor"
          width="100%"
          height="100%"
          frameborder="0"
        ></iframe>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    center: { lat: 55.800112, lng: 37.714591 }
  }),
  methods: {
    print() {
      window.open('/print_address', '_blank')
    }
  }
}
</script>
