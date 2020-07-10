<template>
  <div class="v-application">
    <v-card class=" w100">
      <v-card-title>
        Заказ Нанесение
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          text
          class="mr-25 px-10"
          large
          @click="$emit('close')"
        >
          <v-icon>mdi-close</v-icon>
          Закрыть
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-tabs v-model="tab" background-color="primary" no-animation>
          <v-tab class="tab-nomer-fio" v-for="order in orders" :key="order.id">
            {{ order.titleTab }}
          </v-tab>
          <v-tab class="tab-nomer-fio">
            ИТОГО
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in orders" :key="item.id">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="">Нанесение</th>
                    <th class="">Кол-во</th>
                    <th class="">Цена (руб.)</th>
                    <th class="">Сумма (руб.)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in rows(item)" :key="index">
                    <td>{{ row.logoType }}</td>
                    <td>{{ row.count }}</td>
                    <td>{{ row.price }}</td>
                    <td>{{ row.price * row.count }}</td>
                  </tr>
                  <tr>
                    <td colspan="3" class="text-right">ИТОГО:</td>
                    <td>{{ sumByTab(rows(item)) }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-tab-item>
          <v-tab-item>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="">Нанесение</th>
                    <th class="">Кол-во</th>
                    <th class="">Сумма (руб.)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in rowsTotal()" :key="index">
                    <td>{{ row.name }}</td>
                    <td>{{ row.count }}</td>
                    <td>{{ row.sum }}</td>
                  </tr>
                  <tr>
                    <td colspan="2" class="text-right">ИТОГО:</td>
                    <td>{{ sumTotal }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
      <!-- <v-divider></v-divider> -->
      <!-- <v-card-actions> </v-card-actions> -->
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['orders'],
  data: () => ({
    tab: 0,
    data: [],
    show: false,
    sumTotal: 0
  }),
  methods: {
    // sumTotal() {},
    sumByTab(data) {
      let sum = 0
      data.forEach(x => {
        sum += x.count * x.price
      })
      return sum
    },
    rowsTotal() {
      let result = []
      let sumTotal = 0
      if (this.orders) {
        let mergedLogos = []
        this.orders.forEach(order => {
          let totalSizes = 0
          if (order.orderedSizes) {
            order.orderedSizes.forEach(size => {
              if (size.total) totalSizes += size.total
            })
          }

          if (order.orderedLogos) {
            let logos = order.orderedLogos
            logos.forEach(logo => {
              let sum = 0
              let find = result.find(
                x =>
                  x.logoTypeId === logo.logoTypeId &&
                  x.logoSizeId === logo.logoSizeId
              )
              if (!find) {
                sum = totalSizes * logo.logoType.price
                result.push({
                  name: logo.logoType.name + ' ' + logo.logoSize.name,
                  count: totalSizes,
                  sum: sum,
                  logoTypeId: logo.logoTypeId,
                  logoSizeId: logo.logoSizeId
                })
              } else {
                sum = totalSizes * logo.logoType.price
                find.count += totalSizes
                find.sum += sum
              }
              sumTotal += sum
            })
          }
          if (order.orderedTexts) {
            let texts = order.orderedTexts
            texts.forEach(text => {
              let sum = 0
              let find = result.find(
                x =>
                  x.type === text.type &&
                  x.textSizeId === text.textSizeId &&
                  x.curved === text.curved
              )
              if (!find) {
                sum = totalSizes * text.textSize.price
                result.push({
                  name:
                    (text.type === 'text' ? 'Надпись' : 'Номер') +
                    ' ' +
                    text.textSize.name +
                    ' ' +
                    text.curved,
                  count: totalSizes,
                  sum: sum,
                  type: text.type,
                  textSizeId: text.textSizeId
                })
              } else {
                sum = totalSizes * text.textSize.price
                find.count += totalSizes
                find.sum += sum
              }
              sumTotal += sum
            })
          }
        })
      }
      this.sumTotal = sumTotal
      return result
    },
    rows(data) {
      let result = []
      if (data) {
        if (data.orderedLogos) {
          const logos = data.orderedLogos
          const types = [
            ...new Set(logos.map(x => x.logoType.name + ' ' + x.logoSize.name))
          ]
          types.forEach(type => {
            const find = logos.filter(
              x => x.logoType.name + ' ' + x.logoSize.name === type
            )
            result.push({
              logoType: type,
              count: find.length,
              price: find[0].logoType.price
            })
          })
        }
        if (data.orderedTexts) {
          const texts = data.orderedTexts
          const types = [
            ...new Set(
              texts.map(
                x =>
                  (x.type === 'text' ? 'Надпись' : 'Номер') +
                  ' ' +
                  x.textSize.name +
                  ' ' +
                  x.curved
              )
            )
          ]
          types.forEach(type => {
            const find = texts.filter(
              x =>
                (x.type === 'text' ? 'Надпись' : 'Номер') +
                  ' ' +
                  x.textSize.name +
                  ' ' +
                  x.curved ===
                type
            )
            result.push({
              logoType: type,
              count: find.length,
              price: find[0].textSize.price
            })
          })
        }
      }
      return result
    }
    // mapData() {
    //   if (this.orders) {
    //     this.orders.forEach(order => {
    //       let sizes = []
    //       if (order.orderedSizes) {
    //         const filter = order.orderedSizes.filter(x => x.total > 0)
    //         filter.forEach(size => {
    //           let sizeRows = []
    //           let sizeName = size.size
    //           for (let i = 1; i <= size.total; i++) {
    //             sizeRows.push({
    //               fio: '',
    //               number: ''
    //             })
    //           }
    //           sizes.push({
    //             size: sizeName,
    //             rows: sizeRows
    //           })
    //         })
    //       }
    //       this.data.push({
    //         id: order.id,
    //         name: order.titleTab,
    //         sizes: sizes
    //       })
    //     })
    //   }
    //   this.show = true
    // }
  },
  created() {
    // console.log('CREATED FIO-NUMBER')
    // console.log(this.orders)
    // this.mapData()
  }
}
</script>

<style></style>
