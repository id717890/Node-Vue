<template>
  <v-card class="v-application h100">
    <div class="w100 d-flex flex-column h100">
      <v-btn
        style="position: absolute; right: 20px; top: 20px"
        fab
        outlined
        color="primary"
        @click="$emit('close')"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card-text class="flex-grow-1 d-flex my-0 px-0 py-0" v-html="iframe">
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
export default {
  props: ['iframe'],
  methods: {}
}
</script>
