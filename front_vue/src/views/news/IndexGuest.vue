<template>
  <v-container fluid>
    <v-row>
      <v-col md="8" offset-md="2" sm="12" cols="12">
        <v-row class="justify-center">
          <v-pagination
            :length="length"
            v-model="page"
            class="mb-6"
          ></v-pagination>
          <v-col
            cols="12"
            class="d-flex flex-row flex-wrap justify-space-between"
          >
            <v-card
              :to="'/news/' + item.id"
              v-for="item in data"
              :key="item.id"
              width="300"
              elevation="0"
              class="card-hover card-news mr-6 mb-6 d-flex flex-column"
            >
              <v-img
                height="260px"
                aspect-ratio="1.6"
                :src="img(item.image)"
                class="align-end white--text image-text"
              >
              </v-img>
              <v-card-text class="d-flex flex-grow-1 font-weight-bold pb-0">
                {{ item.title }}
              </v-card-text>
              <v-card-text class="news-date pt-2 text-right">
                {{ date(item.created_at) }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-pagination
            :length="length"
            v-model="page"
            class="mt-6"
          ></v-pagination>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import image from '../../mixins/image'
import moment from 'moment'

export default {
  mixins: [image],
  data: () => ({
    loading: false,
    length: 1,
    page: 1,
    perPage: 9,
    data: []
  }),
  methods: {
    setPagination() {
      if (this.news && this.news.length > 0) {
        const l = Math.trunc(this.news.length / this.perPage)
        const ost = this.news.length % this.perPage
        this.length = l
        if (ost !== 0) this.length++
      } else {
        this.length = 1
      }
    },
    date(value) {
      moment.locale('ru')
      return (
        moment(value).format('DD') +
        ' ' +
        moment(value).format('MMMM') +
        ' ' +
        moment(value).format('YYYY')
      )
    },
    getData() {
      this.setPagination()
      if (this.news && this.news.length > 0) {
        if (this.page === 1) {
          this.data = this.news.slice(0, this.perPage)
        } else {
          const start = (this.page - 1) * this.perPage
          const end = this.perPage * this.page
          this.data = this.news.slice(start, end)
        }
      }
    }
  },
  watch: {
    page() {
      this.getData()
    },
    news() {
      this.getData()
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    // if (this.news && this.news.length > 0) {
    //   const l = Math.trunc(this.news.length / this.perPage)
    //   const ost = this.news.length % this.perPage
    //   this.length = l
    //   if (ost !== 0) this.length++
    // } else {
    //   this.length = 1
    // }
  },
  computed: {
    ...mapState({
      news: state => state.news.allNews
    })
  }
}
</script>
