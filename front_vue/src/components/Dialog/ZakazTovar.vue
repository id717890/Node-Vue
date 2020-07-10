<template>
  <v-card class="v-application">
    <div class="w100">
      <v-card-title>
        Заказ Товар
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          text
          class="mr-25 px-10"
          large
          @click="$emit('close')"
        >
          Закрыть
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-simple-table bordered>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="">Наименование</th>
                <th class="">Размер</th>
                <th class="">Количество Москва</th>
                <th class="">Количество Испания</th>
                <th class="">Общее количество</th>
                <th class="">Цена РРЦ (руб.)</th>
                <th class="">Цена JOMA-CLUB (руб.)</th>
                <th class="">Сумма РРЦ (руб.)</th>
                <th class="">Сумма JOMA-CLUB (руб.)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in rows" :key="index">
                <td class="tb">{{ row.name }}</td>
                <td>{{ row.size }}</td>
                <td>{{ row.inMoscow }}</td>
                <td>{{ row.inSpain }}</td>
                <td>{{ row.total }}</td>
                <td>{{ row.price }}</td>
                <td class="success--text font-weight-bold">
                  {{ row.price_discount }}
                </td>
                <td>{{ row.price * row.total }}</td>
                <td class="success--text font-weight-bold">
                  {{ row.price_discount * row.total }}
                </td>
              </tr>
              <tr>
                <td
                  colspan="8"
                  class="text-right"
                  style="font-size: 1.3rem; font-weight: 900"
                >
                  Итого:
                </td>
                <td style="font-size: 1.3rem; font-weight: 900">
                  {{ total() }} руб.
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
      <!-- <v-divider></v-divider> -->
      <v-card-actions> </v-card-actions>
    </div>
  </v-card>
</template>

<script>
export default {
  props: ['orders'],
  data: () => ({}),
  methods: {
    total() {
      let sum = 0
      this.orders.forEach(order => {
        if (order.orderedSizes) {
          order.orderedSizes.forEach(size => {
            if (size.price_discount && size.total)
              sum += size.price_discount * size.total
          })
        }
      })
      return sum
    }
  },
  computed: {
    rows() {
      let data = []
      this.orders.forEach(order => {
        if (order.orderedSizes) {
          order.orderedSizes.forEach(size => {
            if (size.total > 0)
              data.push({
                name: order.titleTab,
                ...size
              })
          })
        }
      })
      return data
    }
  }
}
</script>

<style></style>
