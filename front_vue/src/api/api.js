import Vue from 'vue'
export default {
  post: url => {
    return Vue.$http
      .post(url)
      .then(x => {
        return x.data
      })
      .catch(error => {
        return error
      })
  },
  post: (url, data) => {
    return Vue.$http
      .post(url, data)
      .then(x => {
        return x.data
      })
      .catch(error => {
        return error
      })
  },
  post: (url, data, config) => {
    return Vue.$http
      .post(url, data, config)
      .then(x => {
        return x.data
      })
      .catch(error => {
        return error
      })
  },
  get: url => {
    return Vue.$http
      .get(url)
      .then(x => {
        return x.data
      })
      .catch(error => {
        return error
      })
  },
  getTypes: () => {
    return Vue.$http
      .get('api/types')
      .then(x => {
        return x.data
      })
      .catch(error => {
        return error
      })
  },
  getLogos: () => {
    return Vue.$http
      .get('api/logos')
      .then(x => {
        return x.data
      })
      .catch(error => {
        return error
      })
  }
}
