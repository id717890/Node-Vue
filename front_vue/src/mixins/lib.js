import Canvas from '../Canvas'
export default {
  methods: {
    clone() {
      // const order = this.getOrder()
      // localStorage.setItem('order', JSON.stringify(order))
      // localStorage.setItem('canvas', JSON.stringify(order.canvas))
      // localStorage.setItem('ctx', JSON.stringify(order.canvas.ctx))

      const id = this.guid()
      let newOrder = JSON.parse(localStorage.getItem('order'))
      newOrder.id = id
      this.currentOrderId = newOrder.id
      this.orders.push(newOrder)
      let loadedCanvas = JSON.parse(localStorage.getItem('canvas'))

      setTimeout(() => {
        newOrder.canvas = new Canvas('orderCanvas_' + newOrder.id)
        newOrder.canvas.ctx.loadFromJSON(
          JSON.parse(localStorage.getItem('ctx'))
        )
        newOrder.canvas.images = loadedCanvas.images
        newOrder.canvas.texts = loadedCanvas.texts
      }, 1500)
      this.$forceUpdate()
    }
  }
}
