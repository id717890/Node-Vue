<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="py-0 ">
        <h3>
          Новости
          <v-btn fab small to="/news/create">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </h3>
      </v-col>

      <v-col cols="12">
        <v-skeleton-loader
          type="table-heading"
          :loading="loading"
          transition="scale-transition"
        >
          <v-data-table
            :headers="headers"
            :items="tableItems"
            class="elevation-1"
            hide
          >
            <template v-slot:item.image="{ item }">
              <v-img max-width="90" :src="img(item.image)"></v-img>
            </template>
            <template v-slot:item.act="{ item }">
              <v-btn
                fab
                text
                small
                title="Редакитровать"
                color="primary"
                :to="'/lk/news/' + item.id"
              >
                <v-icon>mdi-pen</v-icon>
              </v-btn>
              <v-btn
                fab
                text
                small
                title="Удалить"
                color="error"
                @click="deleteItem(item)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>

            <template v-slot:no-data>
              <h4 class="text-xs-center">Нет данных</h4>
            </template>
          </v-data-table>
        </v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const settings = {
  height: 'auto',
  maxWidth: 400,
  adaptive: true,
  transition: 'nice-modal-fade',
  clickToClose: false
}
import imageMixin from '../../mixins/image'
import { mapActions, mapState } from 'vuex'
import ConfirmDialogModal from '../../components/Dialog/ConfirmDialog'
export default {
  mixins: [imageMixin],
  data: () => ({
    removedItem: null,
    headers: [
      { text: 'Заголовок', value: 'title' },
      { text: 'Изображение', value: 'image', sortable: false, width: '150' },
      { text: '', value: '', value: 'act', width: '120', sortable: false }
    ]
  }),
  methods: {
    ...mapActions(['getAllNews', 'resetConfirmDialogResult', 'deleteNews']),
    deleteItem(item) {
      this.removedItem = item
      this.$modal.show(
        ConfirmDialogModal,
        { question: 'Удалить запись?' },
        settings,
        {
          closed: this.confirmDelete
        }
      )
    },
    confirmDelete() {
      if (this.confirmDialogResult === true) {
        this.resetConfirmDialogResult()
        this.deleteNews(this.removedItem)
        this.removedItem = null
      }
    }
  },
  computed: {
    ...mapState({
      tableItems: state => state.news.allNews,
      confirmDialogResult: state => state.dialog.confirmDialogResult
    })
  },
  async created() {
    this.loading = true
    await this.getAllNews()
    this.loading = false
  }
}
</script>
