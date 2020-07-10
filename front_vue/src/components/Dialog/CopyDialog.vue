<template>
  <v-card class="v-application">
    <div class="w100">
      <v-card-title>Выберите заказ для копирования</v-card-title>
      <v-divider />
      <v-card-text v-if="orders" class="pt-8">
        <div
          v-for="order in orders"
          :key="order.id"
          class="d-flex flex-row flex-nowrap"
        >
          <v-btn class="w100 mb-5" color="success" @click="setResult(order.id)">
            <v-icon class="mr-6">mdi-tshirt-crew</v-icon>
            {{ order.titleTab }}
          </v-btn>
        </div>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['orders'],
  methods: {
    ...mapActions(['setCopyDialogResult']),
    setResult(order) {
      this.setCopyDialogResult(order)
      this.$emit('close')
    }
  }
}
</script>
