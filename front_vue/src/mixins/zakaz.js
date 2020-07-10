import context from '../api/api'
export default {
  data: () => ({
    loadingPrintAll: false,
    typeCustomer: 'fizik',
    zakazTovar: [],
    zakazTovarSum: 0,
    zakazNumberName: [],
    zakazLogos: [],
    zakazLogosSum: 0,
    zakazLogosEach: [],
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
  created() {},
  methods: {
    printAll() {
      this.prepareDates()
      this.prepareBeforePrint()
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
    prepareDates() {
      const date = new Date()
      const contractNumber =
        date.getFullYear().toString() +
        (date.getMonth() + 1).toString() +
        date.getDate() +
        date.getHours() +
        date.getMinutes() +
        date.getSeconds()
      this.fizik.number = contractNumber
      this.fizik.date = date.toLocaleDateString()
      this.yurik.number = contractNumber
      this.yurik.date = date.toLocaleDateString()
    },
    prepareFormData() {
      let fd = new FormData()
      let info = ''

      if (this.delivery && this.delivery) {
        switch (this.delivery.delivery) {
          case 'pickup':
            fd.append('delivery', 'Самовывоз')
            break
          case 'courier':
            fd.append('delivery', 'Курьер "КУРЬЕВ СЕРВИС"')
            break
          case 'tk':
            fd.append(
              'delivery',
              'Транспортная компания "ДЕЛОВЫЕ ЛИНИИ", "ПЭК" ИТД'
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

      this.orders.forEach((order, index) => {
        const img = document.getElementById('orderCanvas_' + order.id)
        //метод №1
        // const dataUrl = img.toDataURL()
        // fd.append('images2[]', dataUrl)
        //метод №2
        img.toBlob(data => {
          fd.append('images[]', data, order.titleTab)
        })
      })
      return fd
    },
    prepareBeforePrint() {
      this.prepareZakazTovar()
      this.prepareZakazFio()
      this.prepareZakazLogosEach()
      this.prepareZakazLogos()
      this.fizik.price = this.zakazLogosSum + this.zakazTovarSum
      this.yurik.price = this.zakazLogosSum + this.zakazTovarSum
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
                this.zakazTovarSum += size.price * size.total
                this.zakazTovar.push({
                  name: order.titleTab,
                  ...size,
                  sum: size.price * size.total
                })
              }
            })
          }
        })
    }
  }
}
