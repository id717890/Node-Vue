<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="12" cols="12" v-if="type === 'success'">
        <v-alert type="success " class="mt-3">{{ message }}</v-alert>
      </v-col>
      <v-col sm="12" cols="12" v-if="type === 'error'">
        <v-alert type="error" class="mt-3">{{ message }}</v-alert>
      </v-col>
      <v-col
        sm="12"
        cols="12"
        class="text-center title"
        v-if="message2 !== null"
      >
        {{ message2 }}
      </v-col>
      <v-col sm="12">
        <v-btn class="float-right" tile large @click="cancel">
          <i class="fa fa-check"></i>
          OK
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
  <!-- <div class="dialog-body-wrapper">
  <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Confirmation
        </v-card-title>

        <v-card-text>
          {{question}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            flat
            @click="cancel"
          >
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="confirm"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
</div> -->
</template>

<script>
export default {
  props: ['type', 'message', 'message2'],
  data: () => ({}),
  methods: {
    cancel() {
      this.$emit('close')
    }
  }
}
</script>
