<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-btn @click="print" class="">Печать</v-btn>
        <v-btn @click="$emit('close')" class="">Закрыть</v-btn>
      </v-col>
    </v-row>
    <v-row class="v-application">
      <v-col cols="12" lg="6" offset-lg="3" md="8" offset-md="2">
        <v-row>
          <v-col cols="5">
            <img
              class="logo"
              style="width: 275px"
              src="~@/assets/img/logo3.png"
              alt=""
            />
          </v-col>
          <v-col cols="7">
            <div>{{ zakaz.typeCustomerText }}: {{ zakaz.name }}</div>
            <div>Телефон: {{ zakaz.phone }}</div>
            <div>E-mail: {{ zakaz.email }}</div>
            <div style="font-weight: bold">
              Общая цена: {{ zakaz.price }} руб.
            </div>
            <div>Способ доставки: {{ zakaz.delivery }}</div>
            <div>Способ оплаты: {{ zakaz.payment }}</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <h2>Заказ товар</h2>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>Наименование</th>
                    <th>Размер</th>
                    <th>Количество Москва</th>
                    <th>Количество Испания</th>
                    <th>Общее количество</th>
                    <th>Цена (руб.)</th>
                    <th>Сумма (руб.)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in zakaz.zakazTovar" :key="row.id">
                    <td>{{ row.name }}</td>
                    <td>{{ row.size }}</td>
                    <td>{{ row.inMoscow }}</td>
                    <td>{{ row.inSpain }}</td>
                    <td>{{ row.total }}</td>
                    <td>{{ row.price }}</td>
                    <td>{{ row.price * row.total }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
        <v-row v-for="order in zakaz.zakazLogosEach" :key="order.id">
          <v-col cols="12">
            <h2>Заказ нанесение "{{ order.name }}"</h2>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>Нанесение</th>
                    <th>Кол-во</th>
                    <th>Цена (руб.)</th>
                    <th>Сумма (руб.)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in order.rows" :key="row.id">
                    <td>{{ row.logoType }}</td>
                    <td>{{ row.count }}</td>
                    <td>{{ row.price }}</td>
                    <td>{{ row.sum }}</td>
                  </tr>
                  <tr>
                    <td colspan="3" class="text-right">ИТОГО:</td>
                    <td>{{ order.sum }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <h2>Заказ нанесение "ИТОГО"</h2>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>Нанесение</th>
                    <th>Кол-во</th>
                    <th>Сумма (руб.)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in zakaz.zakazLogos" :key="row.id">
                    <td>{{ row.name }}</td>
                    <td>{{ row.count }}</td>
                    <td>{{ row.sum }}</td>
                  </tr>
                  <tr>
                    <td colspan="2" class="text-right">ИТОГО:</td>
                    <td>{{ zakaz.zakazLogosSum }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <h2>Размер-Номер-Фамилия</h2>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>Модель</th>
                    <th>Размер</th>
                    <th>Номер</th>
                    <th>ФИО</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in zakaz.zakazNumberName" :key="row.id">
                    <td>{{ row.name }}</td>
                    <td>{{ row.size }}</td>
                    <td>{{ row.fio }}</td>
                    <td>{{ row.number }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn @click="print" class="w100">Печать</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    zakaz: null
  }),
  watch: {},
  created() {
    let zakaz = JSON.parse(localStorage.getItem('printZakaz'))
    console.log(zakaz)
    this.zakaz = zakaz
  },
  methods: {
    print() {
      window.print()
    }
  }
}
</script>
