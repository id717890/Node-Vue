<template>
  <v-card class="v-application">
    <div class="w100">
      <v-card-title>
        Таблица РАЗМЕР-НОМЕР-ФАМИЛИЯ
        <v-spacer></v-spacer>
        <v-btn color="success" class="mr-25 px-10" large @click="close">
          <v-icon>mdi-check</v-icon>
          Готово
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-tabs v-model="tab" background-color="primary" no-animation>
          <v-tab class="tab-nomer-fio" v-for="order in data" :key="order.id">
            {{ order.name }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item v-for="order in data" :key="order.id">
            <v-card flat>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="" style="width: 200px">Размер</th>
                      <th class="">Номер</th>
                      <th class="">
                        <span style="left: 75px; position: relative"
                          >Фамилия</span
                        >
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, index) in order.sizes" :key="index">
                      <td colspan="3" class="pa-0">
                        <v-simple-table>
                          <tbody>
                            <tr
                              v-for="(subRow, index) in row.rows"
                              :key="index"
                            >
                              <td
                                v-if="index === 0"
                                :rowspan="row.rows.length"
                                style="width: 150px; border-right: 1px solid rgba(0, 0, 0, 0.12)"
                              >
                                {{ row.size }}
                              </td>
                              <td class="">
                                <div style="height: 32px">
                                  <v-text-field
                                    class="input-fio"
                                    height="32"
                                    solo
                                    v-model="subRow.number"
                                    @input="toUpperNum($event, subRow)"
                                  ></v-text-field>
                                </div>
                              </td>
                              <td>
                                <div style="height: 32px">
                                  <v-text-field
                                    class="input-fio"
                                    height="32"
                                    solo
                                    v-model="subRow.fio"
                                    @input="toUpperFio($event, subRow)"
                                  ></v-text-field>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </v-simple-table>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
      <!-- <v-divider></v-divider> -->
      <!-- <v-card-actions> </v-card-actions> -->
    </div>
  </v-card>
</template>

<script>
export default {
  props: ['orders'],
  data: () => ({
    tab: 0,
    data: [],
    show: false
  }),
  methods: {
    close() {
      this.orders.forEach(order => {
        const find = this.data.find(x => x.id === order.id)
        if (find) {
          order.orderedFio = find.sizes
        }
      })
      this.$emit('close')
    },
    toUpperNum(e, item) {
      item.number = e.toUpperCase()
    },
    toUpperFio(e, item) {
      item.fio = e.toUpperCase()
    },
    mapData() {
      if (this.orders) {
        this.orders.forEach(order => {
          let sizes = []

          if (order.orderedFio && order.orderedFio.length > 0) {
            if (order.orderedSizes) {
              let filter = order.orderedSizes.filter(x => x.total > 0)
              if (filter.length > 0) {
                filter.forEach(size => {
                  let find = order.orderedFio.find(x => x.sizeId === size.id)
                  if (find) {
                    if (find.rows.length > size.total)
                      find.rows.splice(size.total, find.rows.length)
                    if (find.rows.length < size.total) {
                      const steps = size.total - find.rows.length
                      for (let i = 1; i <= steps; i++) {
                        find.rows.push({ fio: '', number: '' })
                      }
                    }
                  } else {
                    let rows = []
                    for (let i = 1; i <= size.total; i++) {
                      rows.push({ fio: '', number: '' })
                    }
                    order.orderedFio.push({
                      sizeId: size.id,
                      size: size.size,
                      rows: rows
                    })
                  }
                })
                let bufer = order.orderedFio
                bufer.forEach(x => {
                  const find = filter.find(f => f.id === x.sizeId)
                  if (!find) {
                    order.orderedFio.splice(order.orderedFio.indexOf(x), 1)
                  }
                })
                sizes = order.orderedFio
              }
            }
          } else {
            if (order.orderedSizes) {
              const filter = order.orderedSizes.filter(x => x.total > 0)
              filter.forEach(size => {
                let sizeRows = []
                let sizeName = size.size
                for (let i = 1; i <= size.total; i++) {
                  sizeRows.push({
                    fio: '',
                    number: ''
                  })
                }
                sizes.push({
                  sizeId: size.id,
                  size: sizeName,
                  rows: sizeRows
                })
              })
            }
          }

          this.data.push({
            id: order.id,
            name: order.titleTab,
            sizes: sizes
          })
          // order.orderedFio = sizes
        })
      }
      this.show = true
    }
  },
  created() {
    // console.log('CREATED FIO-NUMBER')
    // console.log(this.orders)
    this.mapData()
  }
}
</script>

<style></style>
