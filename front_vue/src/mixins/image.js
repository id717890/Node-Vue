import config from '../init/config'
export default {
  methods: {
    img(url) {
      return config.apiAddress + 'api/image/' + url
    }
  }
}
