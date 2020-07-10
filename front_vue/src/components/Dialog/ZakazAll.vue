<template>
  <v-card class="v-application">
    <div class="w100">
      <v-card-title>
        ПРАВИЛА УХОДА ЗА СПОРТИВНОЙ ФОРМОЙ И ЭКИПИРОВКОЙ С НАНЕСЕНИЕМ
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
        <div class="rules-for-form" ref="rules-for-form">
          <p>
            Чтобы спортивная форма, экипировка с нанесением долго служили и
            выполняли свое предназначение нужен правильный уход. Всего несколько
            советов помогут продлить срок службы.
          </p>
          <p>
            В первую очередь ознакомьтесь с правилами стирки указанными на
            вшивном ярлыке с изнаночной стороны вашего изделия.
          </p>
          <p>
            Самым важным советом по уходу за вещами, будет стирать её после
            каждой тренировки, не откладывая. Так как на тренировках мы потеем,
            а пот - это раствор солей и органических веществ, которые могут
            разрушать ткань. Еще очень важно, не бросать мокрые вещи сразу в
            сумку. Лучше если это будет пакет, а затем уже сумка, и тогда не
            придется стирать сумку каждый раз.
          </p>
          <ul>
            <li><strong>Стирайте вещи вывернутыми наизнанку.</strong></li>
            <li><strong>Замки должны быть застегнуты.</strong></li>
            <li><strong>Температура не больше 30-40 градусов.</strong></li>
            <li>
              <strong>Программу стирки выбираем с минимальным временем.</strong>
              Так как особых загрязнений нет, этого будет достаточно. Есть
              программы типа повседневной стирки или быстрой, около полу часа
              стирки будет более чем достаточно.
            </li>
            <li>
              <strong>Пониженные обороты отжима.</strong> Если есть возможность
              снизить обороты в вашей стиральной машинке, будет очень кстати,
              веди высокие обороты разрушают ткань. А такая одежда и так быстро
              сохнет.
            </li>
            <li>
              <strong>Выбирайте мягкое средство для стирки</strong> (cейчас даже
              есть специальные, с отметкой SPORT).
            </li>
            <li><strong>Не добавляйте смягчающий кондиционер.</strong></li>
            <li><strong>Не добавляйте отбеливатель.</strong></li>
            <li>
              Если требуется
              <strong>глажка, лучше это сделать отпаривателем,</strong> или на
              минимальной температуре утюга,
              <strong>выворачивая наизнанку.</strong>
            </li>
          </ul>
          <p>
            Эти простые советы помогут продлить срок эксплуатации вашей одежды
            для тренировок. Проставьте галочку в окне «Я ОЗНАКОМЛЕН С ПРАВИЛАМИ
            УХОДА» Только после этого вы сможете перейти к подписанию договора.
          </p>
        </div>
        <div class="text-center">
          <a
            href="#"
            class="rules-btn"
            @click.prevent.stop="toggleRules"
            v-if="!showAllRules"
            >Читать далее</a
          >
          <a
            href="#"
            class="rules-btn"
            @click.prevent.stop="toggleRules"
            v-if="showAllRules"
            >Скрыть</a
          >
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="agreeRules"
            :value="agreeRules"
            id="defaultCheck1"
          />
          <label class="form-check-label" for="defaultCheck1">
            Я ОЗНАКОМЛЕН С ПРАВИЛАМИ УХОДА
          </label>
        </div>
        <div v-if="agreeRules === true">
          <h3 class="text-center">Вы являетесь</h3>
          <div class="row">
            <div class="col-6 text-center">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios1"
                  value="fizik"
                  v-model="typeCustomer"
                />
                <label class="form-check-label" for="exampleRadios1">
                  Физическим лицом
                </label>
              </div>
            </div>
            <div class="col-6 text-center">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios2"
                  value="yurik"
                  v-model="typeCustomer"
                />
                <label class="form-check-label" for="exampleRadios2">
                  Юридическим лицом
                </label>
              </div>
            </div>
          </div>

          <fiz
            v-if="typeCustomer === 'fizik' && showDocs === true"
            :data="fizik"
            @fizikChanged="fizikChanged($event)"
            ref="fizikDocs"
          />
          <yur
            v-if="typeCustomer === 'yurik' && showDocs === true"
            :data="yurik"
            @yurikChanged="yurikChanged($event)"
            ref="yurikDocs"
          />
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="printAll"
          large
          :disabled="!typeCustomer"
          :loading="loadingPrintAll"
          outlined
          color="primary"
          class="px-10 mr-3"
        >
          <v-icon class="mr-3">mdi-download</v-icon>
          Скачать
        </v-btn>
        <v-btn
          @click="openPrintZakaz"
          large
          outlined
          color="success"
          class="px-10 mr-3"
          :disabled="!typeCustomer"
        >
          <v-icon>mdi-printer</v-icon>
          Печать
        </v-btn>
        <v-btn
          @click="sendForm"
          :disabled="allowSendFormFizik"
          :loading="loadingZakaz"
          large
          color="success"
          class="px-10"
        >
          <v-icon>mdi-check</v-icon>
          Оформить заказ
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import Fiz from '../Docs/Fiz'
import Yur from '../Docs/Yur'
import context from '../../api/api'
import { mapActions } from 'vuex'
import ZakazAllPrintDialog from '../../components/Dialog/ZakazAllPrintDialog'
import config from '../../init/config'
export default {
  props: ['orders', 'delivery', 'promocode'],
  components: {
    Fiz,
    Yur
  },
  data: () => ({
    loadingPrintAll: false,
    loadingZakaz: false,
    showDocs: false,
    showAllRules: false,
    agreeRules: false,
    typeCustomer: '',
    zakazTovar: [],
    zakazTovarSum: 0,
    zakazNumberName: [],
    zakazLogos: [],
    zakazLogosSum: 0,
    zakazLogosEach: [],
    priceWoPromocode: 0,
    fizik: {
      number: null,
      date: null,
      firstName: '',
      lastName: '',
      middleName: '',
      email: '',
      phone: '',
      price: 0,
      agreeContractNanesenie: false,
      agreeContractBuy: false,
      showContractBuy: false,
      showContractNanesenie: false
    },
    yurik: {
      number: null,
      date: null,
      field1: '',
      field2: '',
      field3: '',
      email: '',
      phone: '',
      price: 0,
      agreeContractNanesenie: false,
      agreeContractBuy: false,
      showContractBuy: false,
      showContractNanesenie: false
    }
  }),
  created() {
    this.prepareZakazTovar()
    this.prepareZakazFio()
    this.prepareZakazLogosEach()
    this.prepareZakazLogos()
    this.priceWoPromocode = this.zakazLogosSum + this.zakazTovarSum
    this.fizik.price = this.zakazLogosSum + this.zakazTovarSum
    this.yurik.price = this.zakazLogosSum + this.zakazTovarSum
    if (
      this.promocode &&
      this.promocode.discount &&
      this.promocode.discount > 0
    ) {
      let sum = this.zakazLogosSum + this.zakazTovarSum
      sum = sum - (sum * this.promocode.discount) / 100
      this.fizik.price = sum
      this.yurik.price = sum
    }
    this.showDocs = true
  },
  methods: {
    ...mapActions(['setPrintZakaz']),
    openPrintZakaz() {
      let printZakaz = {}
      let fd = this.prepareFormData()
      printZakaz.typeCustomerText =
        this.typeCustomer === 'fizik' ? 'Физ. лицо' : 'Юр. лицо'
      printZakaz.phone =
        this.typeCustomer === 'fizik' ? this.fizik.phone : this.yurik.phone
      printZakaz.email =
        this.typeCustomer === 'fizik' ? this.fizik.email : this.yurik.email
      printZakaz.name =
        this.typeCustomer === 'fizik' ? fd.get('fio') : fd.get('field1')

      printZakaz.price = fd.get('price')
      printZakaz.delivery = fd.get('delivery')
      printZakaz.payment = fd.get('payment')
      printZakaz.zakazTovar = JSON.parse(fd.get('zakazTovar'))
      printZakaz.zakazLogosEach = JSON.parse(fd.get('zakazLogosEach'))
      printZakaz.zakazLogos = JSON.parse(fd.get('zakazLogos'))
      printZakaz.zakazNumberName = JSON.parse(fd.get('zakazNumberName'))
      printZakaz.zakazLogosSum = fd.get('zakazLogosSum')
      printZakaz.typeCustomer = fd.get('typeCustomer')
      printZakaz.fizik = this.fizik
      printZakaz.yurik = this.yurik

      let images = []
      this.orders.forEach((order, index) => {
        const img = document.getElementById('orderCanvas_' + order.id)
        //метод №1
        const dataUrl = img.toDataURL()
        images.push({
          id: order.id,
          name: order.titleTab,
          imageBase64: dataUrl,
          comment: order.comment
        })
        //метод №2
        // img.toBlob(data => {
        //   fd.append('images[]', data, order.titleTab)
        // })
      })
      printZakaz.images = images

      localStorage.setItem('printZakaz', JSON.stringify(printZakaz))
      setTimeout(() => {
        window.open('/print_zakaz', '_blank')
      }, 600)
    },
    printAll() {
      this.loadingPrintAll = true
      let fd = this.prepareFormData()
      fd.append(
        'typeCustomerText',
        this.typeCustomer === 'fizik' ? 'Физ. лицо' : 'Юр. лицо'
      )
      fd.append(
        'phone',
        this.typeCustomer === 'fizik' ? this.fizik.phone : this.yurik.phone
      )
      fd.append(
        'email',
        this.typeCustomer === 'fizik' ? this.fizik.email : this.yurik.email
      )
      const config = {
        'content-type': 'multipart/form-data',
        responseType: 'blob'
      }

      setTimeout(() => {
        context
          .post('api/export/order', fd, config)
          .then(x => {
            let fileUrl = window.URL.createObjectURL(new Blob([x]))
            let fileLink = document.createElement('a')
            fileLink.href = fileUrl
            fileLink.setAttribute('download', 'order.pdf')
            document.body.appendChild(fileLink)
            fileLink.click()
            fileLink.remove()
            this.loadingPrintAll = false
          })
          .catch(x => {
            console.log(x)
            this.loadingPrintAll = false
          })
      }, 2000)
    },
    prepareFormData() {
      let fd = new FormData()
      let info = ''

      if (this.delivery && this.delivery) {
        switch (this.delivery.delivery) {
          case 'pickup':
            fd.append(
              'delivery',
              'Самовывоз (адрес склада - Краснобогатырская 89, стр. 5)'
            )
            break
          case 'courier':
            fd.append(
              'delivery',
              `Курьер "КУРЬЕР СЕРВИС", ДОСТАВИСТА, И ТД (адрес ${
                this.delivery.address
              })`
            )
            break
          case 'tk':
            fd.append(
              'delivery',
              `Транспортная компания "ДЕЛОВЫЕ ЛИНИИ", "ПЭК" И ТД (адрес ${
                this.delivery.address
              })`
            )
            break
        }
      }

      if (this.delivery && this.delivery.payment) {
        switch (this.delivery.payment) {
          case 'card':
            fd.append('payment', 'БЕЗНАЛИЧНАЯ ОПЛАТА')
            break
          case 'cash':
            fd.append('payment', 'НАЛИЧНЫЕ')
            break
        }
      }
      if (this.typeCustomer === 'fizik') {
        fd.append('date', this.fizik.date)
        fd.append('number', this.fizik.number)
        fd.append('price', this.fizik.price)
        fd.append(
          'fio',
          this.fizik.lastName +
            ' ' +
            this.fizik.firstName +
            ' ' +
            this.fizik.middleName
        )
        info =
          'Физ. лицо: ' +
          this.fizik.lastName +
          ' ' +
          this.fizik.firstName +
          ' ' +
          this.fizik.middleName +
          '<br/>'
        info += 'Телефон: ' + this.fizik.phone + '<br/>'
        info +=
          'Договор купли-продажи №' +
          this.fizik.number +
          ' от ' +
          this.fizik.date +
          '<br/>'
        info +=
          'Договор оказания услуг №' +
          this.fizik.number +
          ' от ' +
          this.fizik.date +
          '<br/>'
        info += 'Сумма договора: ' + this.fizik.price + ' руб.<br/>'
        if (this.fizik.email) info += 'E-mail: ' + this.fizik.email + '<br/>'
      }

      if (this.typeCustomer === 'yurik') {
        fd.append('date', this.yurik.date)
        fd.append('number', this.yurik.number)
        fd.append('price', this.yurik.price)
        fd.append('field1', this.yurik.field1)
        fd.append('field2', this.yurik.field2)
        fd.append('field3', this.yurik.field3)
        info = 'Юридическое лицо: <br/>' + this.yurik.field1 + '<br/>'
        info += 'Телефон: ' + this.yurik.phone + '<br/>'
        if (this.yurik.email) info += 'E-mail: ' + this.yurik.email + '<br/>'
        if (this.yurik.field2) info += this.yurik.field2 + '<br/>'
        if (this.yurik.field3) info += this.yurik.field3 + '<br/>'
        info +=
          'Договор купли-продажи №' +
          this.yurik.number +
          ' от ' +
          this.yurik.date +
          '<br/>'
        info +=
          'Договор оказания услуг №' +
          this.yurik.number +
          ' от ' +
          this.yurik.date +
          '<br/>'
        info += 'Сумма договора: ' + this.yurik.price + ' руб.<br/>'
      }

      fd.append('info', info)
      fd.append('price', this.zakazTovarSum + this.zakazLogosSum)
      fd.append('typeCustomer', this.typeCustomer)
      fd.append('zakazTovar', JSON.stringify(this.zakazTovar))
      fd.append('zakazTovarSum', this.zakazTovarSum)
      fd.append('zakazLogos', JSON.stringify(this.zakazLogos))
      fd.append('zakazLogosSum', this.zakazLogosSum)
      fd.append('zakazLogosEach', JSON.stringify(this.zakazLogosEach))
      fd.append('zakazNumberName', JSON.stringify(this.zakazNumberName))

      let comments = []
      this.orders.forEach((order, index) => {
        const img = document.getElementById('orderCanvas_' + order.id)
        if (order.comment)
          comments.push({
            name: order.titleTab,
            comment: order.comment
          })
        //метод №1
        // const dataUrl = img.toDataURL()
        // fd.append('images2[]', dataUrl)
        //метод №2
        img.toBlob(data => {
          fd.append('images[]', data, order.titleTab)
        })
      })
      fd.append('comments', JSON.stringify(comments))
      return fd
    },
    sendForm() {
      let fd = new FormData()
      let info = ''
      fd.append(
        'promocode',
        this.promocode
          ? this.promocode.name + ' (Скидка ' + this.promocode.discount + '%)'
          : 'без промокода'
      )
      if (this.delivery && this.delivery) {
        switch (this.delivery.delivery) {
          case 'pickup':
            fd.append('delivery', 'Самовывоз')
            break
          case 'courier':
            fd.append(
              'delivery',
              `Курьер "КУРЬЕР СЕРВИС", ДОСТАВИСТА, И ТД (адрес ${
                this.delivery.address
              })`
            )
            break
          case 'tk':
            fd.append(
              'delivery',
              `Транспортная компания "ДЕЛОВЫЕ ЛИНИИ", "ПЭК" И ТД (адрес ${
                this.delivery.address
              })`
            )
            break
        }
      }
      if (this.delivery && this.delivery.payment) {
        switch (this.delivery.payment) {
          case 'card':
            fd.append('payment', 'Карта')
            break
          case 'cash':
            fd.append('payment', 'Наличные')
            break
        }
      }
      if (this.typeCustomer === 'fizik') {
        fd.append('date', this.fizik.date)
        fd.append('number', this.fizik.number)
        fd.append('price', this.fizik.price)
        fd.append(
          'fio',
          this.fizik.lastName +
            ' ' +
            this.fizik.firstName +
            ' ' +
            this.fizik.middleName
        )
        info =
          'Физ. лицо: ' +
          this.fizik.lastName +
          ' ' +
          this.fizik.firstName +
          ' ' +
          this.fizik.middleName +
          '<br/>'
        info += 'Телефон: ' + this.fizik.phone + '<br/>'
        info +=
          'Договор купли-продажи №' +
          this.fizik.number +
          ' от ' +
          this.fizik.date +
          '<br/>'
        info +=
          'Договор оказания услуг №' +
          this.fizik.number +
          ' от ' +
          this.fizik.date +
          '<br/>'
        info += 'Сумма договора: ' + this.fizik.price + ' руб.<br/>'
        info +=
          'Сумма договора (без промокода): ' +
          this.priceWoPromocode +
          ' руб.<br/>'
        if (this.fizik.email) info += 'E-mail: ' + this.fizik.email + '<br/>'
      }

      if (this.typeCustomer === 'yurik') {
        fd.append('date', this.yurik.date)
        fd.append('number', this.yurik.number)
        fd.append('price', this.yurik.price)
        fd.append('field1', this.yurik.field1)
        fd.append('field2', this.yurik.field2)
        fd.append('field3', this.yurik.field3)
        info = 'Юридическое лицо: <br/>' + this.yurik.field1 + '<br/>'
        info += 'Телефон: ' + this.yurik.phone + '<br/>'
        if (this.yurik.email) info += 'E-mail: ' + this.yurik.email + '<br/>'
        if (this.yurik.field2) info += this.yurik.field2 + '<br/>'
        if (this.yurik.field3) info += this.yurik.field3 + '<br/>'
        info +=
          'Договор купли-продажи №' +
          this.yurik.number +
          ' от ' +
          this.yurik.date +
          '<br/>'
        info +=
          'Договор оказания услуг №' +
          this.yurik.number +
          ' от ' +
          this.yurik.date +
          '<br/>'
        info += 'Сумма договора: ' + this.yurik.price + ' руб.<br/>'
        info +=
          'Сумма договора (без промокода): ' +
          this.priceWoPromocode +
          ' руб.<br/>'
      }

      fd.append('info', info)
      fd.append('price', this.zakazTovarSum + this.zakazLogosSum)
      fd.append('typeCustomer', this.typeCustomer)
      fd.append('zakazTovar', JSON.stringify(this.zakazTovar))
      fd.append('zakazTovarSum', this.zakazTovarSum)
      fd.append('zakazLogos', JSON.stringify(this.zakazLogos))
      fd.append('zakazLogosSum', this.zakazLogosSum)
      fd.append('zakazLogosEach', JSON.stringify(this.zakazLogosEach))
      fd.append('zakazNumberName', JSON.stringify(this.zakazNumberName))

      let comments = []
      this.orders.forEach((order, index) => {
        const img = document.getElementById('orderCanvas_' + order.id)
        if (order.comment)
          comments.push({
            name: order.titleTab,
            comment: order.comment
          })
        // console.log(img)
        img.toBlob(data => {
          fd.append('images[]', data, order.id)
        })
      })
      fd.append('comments', JSON.stringify(comments))
      // fd.append("zakazTovar", JSON.stringify(this.tableSizes));
      const config = {
        'content-type': 'multipart/form-data'
      }
      this.loadingZakaz = true
      setTimeout(() => {
        context
          .post('api/callback/mail', fd, config)
          .then(() => {
            this.loadingZakaz = false
            this.$emit('close')
          })
          .catch(x => {
            console.log(x)
            this.loadingZakaz = false
          })
      }, 2000)
    },
    prepareZakazLogosEach() {
      let result = []
      if (this.orders) {
        this.orders.forEach(order => {
          let totalSumByOrder = 0
          let rows = []
          if (order.orderedLogos) {
            const logos = order.orderedLogos
            const types = [
              ...new Set(
                logos.map(x => x.logoType.name + ' ' + x.logoSize.name)
              )
            ]
            types.forEach(type => {
              const find = logos.filter(
                x => x.logoType.name + ' ' + x.logoSize.name === type
              )
              let price = find[0].logoType.price
              let count = find.length
              let sum = price * count
              totalSumByOrder += sum
              rows.push({
                logoType: type,
                count: count,
                price: price,
                sum: sum
              })
            })
          }
          if (order.orderedTexts) {
            const texts = order.orderedTexts
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
              let price = find[0].textSize.price
              let count = find.length
              let sum = price * count
              totalSumByOrder += sum
              rows.push({
                logoType: type,
                count: count,
                price: price,
                sum: sum
              })
            })
          }

          result.push({
            id: order.id,
            name: order.titleTab,
            rows: rows,
            sum: totalSumByOrder
          })
        })
      }
      this.zakazLogosEach = result
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
    prepareZakazFio() {
      if (this.orders)
        this.orders.forEach(order => {
          if (order.orderedFio) {
            order.orderedFio.forEach(size => {
              size.rows.forEach(row => {
                this.zakazNumberName.push({
                  name: order.titleTab,
                  size: size.size,
                  fio: row.fio,
                  number: row.number
                })
              })
            })
          }
        })
    },
    prepareZakazTovar() {
      if (this.orders)
        this.orders.forEach(order => {
          if (order.orderedSizes) {
            order.orderedSizes.forEach(size => {
              if (size.total && size.total > 0) {
                this.zakazTovarSum += size.price_discount * size.total
                this.zakazTovar.push({
                  name: order.titleTab,
                  ...size,
                  sum: size.price * size.total
                })
              }
            })
          }
        })
    },
    fizikChanged(e) {
      this.fizik = e
    },
    yurikChanged(e) {
      this.yurik = e
    },
    toggleRules() {
      this.showAllRules = !this.showAllRules
      var rules = this.$refs['rules-for-form']
      if (rules.style.maxHeight) {
        rules.style.maxHeight = null
      } else {
        rules.style.maxHeight = rules.scrollHeight + 'px'
        rules.style.height = rules.scrollHeight + 'px'
      }
    }
  },
  computed: {
    allowSendFormFizik() {
      if (this.typeCustomer === 'fizik')
        return (
          this.fizik.agreeContractBuy === false ||
          this.fizik.agreeContractNanesenie === false ||
          !this.fizik.firstName ||
          !this.fizik.lastName ||
          !this.fizik.middleName ||
          !this.fizik.phone
        )
      if (this.typeCustomer === 'yurik')
        return (
          this.yurik.agreeContractBuy === false ||
          this.yurik.agreeContractNanesenie === false ||
          !this.yurik.field1 ||
          !this.yurik.phone
        )

      return true
    }
  }
}
</script>

<style></style>
