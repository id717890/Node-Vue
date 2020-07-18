<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="py-0 ">
        <h3>
          Альбомы с изображениям
          <v-btn fab small to="/lk/album/create">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn
            class="ml-3"
            fab
            small
            to="/lk/albums-images"
            title="Каталог изображений"
          >
            <v-icon>mdi-image</v-icon>
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
            :options="pagination"
            :footer-props="footerProps"
            hide
          >
            <template v-slot:item.act="{ item }">
              <v-btn
                fab
                text
                small
                title="Редакитровать"
                color="primary"
                :to="'/lk/album/' + item.id"
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
import imageMixin from '../../mixins/image'
import { mapActions, mapState } from 'vuex'
import config from '../../init/config'
import ConfirmDialogModal from '../../components/Dialog/ConfirmDialog'
export default {
  mixins: [imageMixin],
  data: () => ({
    footerProps: {
      itemsPerPageOptions: config.rowsPerPageTable
    },
    removedItem: null,
    pagination: {
      itemsPerPage: -1
    },
    headers: [
      { text: 'Название', value: 'name' },
      { text: 'Описание', value: 'description' },
      { text: '', value: '', value: 'act', width: '120', sortable: false }
    ]
  }),
  methods: {
    ...mapActions([
      'getAllAlbums',
      'resetConfirmDialogResult',
      'deleteAlbum',
      'setLoading'
    ]),
    deleteItem(item) {
      this.removedItem = item
      this.$modal.show(
        ConfirmDialogModal,
        { question: 'Удалить запись?' },
        config.modalSettings,
        {
          closed: this.confirmDelete
        }
      )
    },
    confirmDelete() {
      if (this.confirmDialogResult === true) {
        this.resetConfirmDialogResult()
        this.deleteAlbum(this.removedItem)
        this.removedItem = null
      }
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.loading,
      tableItems: state => state.album.allAlbums,
      confirmDialogResult: state => state.dialog.confirmDialogResult
    })
  },
  async created() {
    this.setLoading(true)
    await this.getAllAlbums()
  }
}
</script>
