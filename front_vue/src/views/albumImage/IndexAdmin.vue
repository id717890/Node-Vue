<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="py-0 d-flex flex-row ">
        <h3>
          Изображения
          <v-btn fab small to="/lk/album/create">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn
            class="ml-3"
            fab
            small
            to="/lk/albums"
            title="Каталог альбомов"
          >
            <v-icon>mdi-folder-multiple-image</v-icon>
          </v-btn>
          <v-btn
            title="Показать списком"
            fab
            text
            small
            class="ml-3"
            v-if="view === 'card'"
            @click="setView('list')"
          >
            <v-icon>mdi-view-list</v-icon>
          </v-btn>
          <v-btn
            title="Показать таблицей"
            fab
            text
            small
            class="ml-3"
            v-if="view === 'list'"
            @click="setView('card')"
          >
            <v-icon>mdi-view-module</v-icon>
          </v-btn>
          <v-btn
            title="Загрузить изображения в альбом"
            fab
            text
            small
            class="ml-3"
            @click="$refs.file.click()"
            v-if="currentAlbum && currentAlbum.value !== -1"
          >
            <v-icon>mdi-cloud-upload</v-icon>
          </v-btn>
          <input
            style="display: none"
            ref="file"
            type="file"
            accept="image/jpeg"
            multiple
            @change="uploadImages"
          />
        </h3>
        <v-spacer></v-spacer>
        <v-select
          dense
          v-if="albums"
          :items="albums"
          label="Выберите альбом"
          return-object
          item-text="name"
          v-model="currentAlbum"
        ></v-select>
      </v-col>
      <v-col cols="12" v-if="view === 'card'" class="d-flex flex-row flex-wrap">
        <v-card
          v-for="item in images"
          :key="item.id"
          width="300"
          class="card-hover card-img-inner-action mr-6 mb-6 d-flex flex-column"
        >
          <v-img
            height="260px"
            aspect-ratio="1.6"
            :src="img(item.image)"
            class="align-end white--text image-text"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
            <div>
              <v-btn fab text title="Просмотр" @click="openImageSlider(item)">
                <v-icon>mdi-magnify-plus-outline</v-icon>
              </v-btn>
              <v-btn
                fab
                text
                title="Удалить"
                color="error"
                @click="deleteItem(item)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </v-img>
        </v-card>
      </v-col>
      <v-col cols="12" v-else>
        <v-skeleton-loader
          type="table-heading"
          :loading="loading"
          transition="scale-transition"
        >
          <v-data-table
            :headers="headers"
            :items="images"
            class="elevation-1"
            :options="pagination"
            :footer-props="footerProps"
            hide
          >
            <template v-slot:item.image="{ item }">
              <v-img max-width="120" :src="img(item.image)">
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </template>
            <template v-slot:item.act="{ item }">
              <v-btn
                fab
                small
                text
                title="Просмотр"
                @click="openImageSlider(item)"
              >
                <v-icon>mdi-magnify-plus-outline</v-icon>
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
import ImageSliderDialog from '../../components/Dialog/ImageSlider1'
export default {
  mixins: [imageMixin],
  data: () => ({
    view: localStorage.getItem('album-images')
      ? localStorage.getItem('album-images')
      : 'list',
    currentAlbum: null,
    defaultAlbum: {
      name: 'Все альбомы',
      value: -1
    },
    footerProps: {
      itemsPerPageOptions: config.rowsPerPageTable
    },
    removedItem: null,
    pagination: {
      itemsPerPage: -1
    },
    headers: [
      { text: 'Изображение', value: 'image' },
      { text: 'Описание', value: 'description' },
      { text: '', value: '', value: 'act', width: '120', sortable: false }
    ]
  }),
  methods: {
    ...mapActions([
      'getAllAlbums',
      'resetConfirmDialogResult',
      'deleteImageFromAlbum',
      'setLoading',
      'uploadImageToAlbumMultiple',
      'addUpploadedImagesToAlbum'
    ]),
    uploadImages(event) {
      let fd = new FormData()
      fd.append('prefix', 'album-image')
      fd.append('album', this.currentAlbum.id)
      event.target.files.forEach(file => {
        fd.append('images[]', file)
      })
      this.uploadImageToAlbumMultiple(fd)
        .then(x => {
          if (x.data && x.data.msg) {
            this.$noty.error(x.data.msg)
          } else {
            this.addUpploadedImagesToAlbum(x)
          }
        })
        .catch(x => console.log(x))
    },
    openImageSlider(image) {
      let images = []
      let buf = [...this.images]
      const find = this.images.indexOf(image)
      if (find !== -1) {
        buf.splice(find, 1)
        images = [image, ...buf]
      }
      this.$modal.show(
        ImageSliderDialog,
        { images: images },
        {
          ...config.modalSettings,
          width: '70%',
          scrollable: true,
          clickToClose: true
        }
      )
    },
    setView(view) {
      this.view = view
      localStorage.setItem('album-images', view)
    },
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
        this.deleteImageFromAlbum(this.removedItem)
        this.removedItem = null
      }
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.loading,
      tableItems: state => state.album.allAlbums,
      confirmDialogResult: state => state.dialog.confirmDialogResult
    }),
    albums() {
      return [this.defaultAlbum, ...this.tableItems]
    },
    images() {
      let images = []
      if (this.currentAlbum && this.currentAlbum.value === -1) {
        images = this.tableItems.reduce((result, current) => {
          return result.concat(current.images)
        }, [])
      } else {
        images = this.currentAlbum.images
      }
      return images
    }
  },
  async created() {
    this.setLoading(true)
    this.currentAlbum = this.defaultAlbum
    await this.getAllAlbums()
  },
  mounted() {}
}
</script>
