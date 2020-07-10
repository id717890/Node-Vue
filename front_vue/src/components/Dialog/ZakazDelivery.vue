<template>
  <v-card class="v-application">
    <div class="w100">
      <v-card-text>
        <v-alert color="yellow" icon="mdi-cash">
          Итоговая сумма: {{ totalPrice }} руб.
        </v-alert>
        <v-card>
          <v-card-title>Способ оплаты</v-card-title>
          <v-card-text>
            <v-radio-group v-model="payment">
              <v-radio label="БЕЗНАЛИЧНАЯ ОПЛАТА" value="card"></v-radio>
              <v-radio label="НАЛИЧНЫЕ" value="cash"></v-radio>
            </v-radio-group>
          </v-card-text>
        </v-card>
        <v-card class="mt-3">
          <v-card-title>Способ доставки</v-card-title>
          <v-card-text>
            <v-radio-group v-model="delivery">
              <v-radio
                label="Самовывоз (адрес склада - Краснобогатырская 89, стр. 5)"
                value="pickup"
              ></v-radio>
              <v-radio
                label="Курьер 'КУРЬЕР СЕРВИС', ДОСТАВИСТА, И ТД (УКАЗАТЬ адрес получателя)"
                value="courier"
              ></v-radio>
              <v-radio
                label="Транспортная компания 'ДЕЛОВЫЕ ЛИНИИ', 'ПЭК' И ТД (УКАЗАТЬ адрес получателя)"
                value="tk"
              ></v-radio>
            </v-radio-group>
            <v-text-field
              v-if="delivery !== 'pickup'"
              label="Укажите адрес"
              v-model="address"
              required
              :rules="textField"
            >
            </v-text-field>
          </v-card-text>
        </v-card>
      </v-card-text>
      <v-card-actions class="px-4 pb-4">
        <v-btn @click="$emit('close')" large outlined class="px-10">
          <v-icon>mdi-close</v-icon>
          Отмена
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          @click="save"
          :disabled="allowSave()"
          large
          color="success"
          class="px-10"
        >
          <v-icon>mdi-check</v-icon>
          Сохранить
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import context from '../../api/api'
import { mapActions } from 'vuex'
export default {
  props: ['orders', 'deliveryAndPayment'],
  data: () => ({
    textField: [v => !!v || 'Обязательное поле'],
    totalPrice: 0,
    totalPriceWoDiscount: 0,
    payment: 'card',
    delivery: 'pickup',
    address: '',
    loadingPrint: false,
    zakazTovarSum: 0,
    zakazTovarSumWoDiscount: 0,
    zakazNumberName: [],
    zakazLogos: [],
    zakazLogosSum: 0
  }),
  created() {
    this.prepareZakazTovar()
    this.prepareZakazLogos()
    this.totalPrice = this.zakazLogosSum + this.zakazTovarSum
    this.totalPriceWoDiscount =
      this.zakazLogosSum + this.zakazTovarSumWoDiscount
  },
  mounted() {
    if (this.deliveryAndPayment && this.deliveryAndPayment.delivery)
      this.delivery = this.deliveryAndPayment.delivery
    if (this.deliveryAndPayment && this.deliveryAndPayment.payment)
      this.payment = this.deliveryAndPayment.payment
    if (this.deliveryAndPayment && this.deliveryAndPayment.address)
      this.address = this.deliveryAndPayment.address
  },
  methods: {
    ...mapActions(['setDeliveryDialog']),
    allowSave() {
      if (this.delivery !== 'pickup' && !this.address) return true
      return false
    },
    save() {
      const payload = {
        delivery: this.delivery,
        payment: this.payment,
        address: this.address
      }
      this.setDeliveryDialog(payload)
      this.$emit('close')
    },
    print() {
      let data = {
        price: this.totalPrice,
        delivery: '',
        payment: ''
      }
      switch (this.delivery) {
        case 'pickup':
          data.delivery = 'Самовывоз'
          break
        case 'courier':
          data.delivery = 'Курьер "КУРЬЕВ СЕРВИС"'
          break
        case 'tk':
          data.delivery = 'Транспортная компания "ДЕЛОВЫЕ ЛИНИИ", "ПЭК" ИТД'
          break
      }

      switch (this.payment) {
        case 'card':
          data.payment = 'Карта'
          break
        case 'cash':
          data.payment = 'Наличные'
          break
      }

      this.loadingPrint = true
      //Перенесено в печать основного заказа
      // context
      //   .post('api/export/delivery', data, {
      //     // 'content-type': 'application/vnd.ms-excel;charset=UTF-8',
      //     responseType: 'blob'
      //   })
      //   .then(x => {
      //     let fileUrl = window.URL.createObjectURL(new Blob([x]))
      //     let fileLink = document.createElement('a')
      //     fileLink.href = fileUrl
      //     fileLink.setAttribute('download', 'delivery.pdf')
      //     document.body.appendChild(fileLink)
      //     fileLink.click()
      //     fileLink.remove()
      //     this.loadingPrint = false
      //   })
      //   .catch(x => {
      //     console.log(x)
      //     this.loadingPrint = false
      //   })
    },
    prepareZakazLogos() {
      let result = []
      let sumTotal = 0
      if (this.orders) {
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
      this.zakazLogos = result
      this.zakazLogosSum = sumTotal
    },
    prepareZakazTovar() {
      if (this.orders)
        this.orders.forEach(order => {
          if (order.orderedSizes) {
            order.orderedSizes.forEach(size => {
              if (size.total && size.total > 0) {
                this.zakazTovarSum += size.price_discount * size.total
                this.zakazTovarSumWoDiscount += size.price * size.total
              }
            })
          }
        })
    }
  }
}
</script>
