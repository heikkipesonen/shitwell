<template lang="html">
  <SidePane v-model="visible" v-if="visible">
    <InputContainer v-model="model.name" type="text" name="name" />
    <InputContainer v-model="model.maxLevel" type="text" name="Level when empty" />
    <InputContainer v-model="model.minLevel" type="text" name="Level when full" />

    <button slot="toolbar" class="control" @click="update">
      <i class="ion-ios-add"></i>
    </button>
    <span slot="toolbar" class="flex"></span>
    <button slot="toolbar" class="control" @click="close">
      <i class="ion-ios-arrow-dropleft"></i>
    </button>
  </SidePane>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      promise: null,
      model: {},
      visible: false
    }
  },

  methods: {
    ...mapActions({
      'updateDevice': 'Devices/update'
    }),

    open (model) {
      this.visible = true
      this.model = {
        ...model
      }

      return new Promise((resolve, reject) => {
        this.promise = {
          resolve,
          reject
        }
      }).finally(() => {
        this.promise = null
        this.visible = false
      })
    },

    update () {
      this.updateDevice({
        ...this.model,
        maxLevel: parseInt(this.model.maxLevel) || 0,
        minLevel: parseInt(this.model.minLevel) || 0
      })
      this.promise.resolve()
    },

    close () {
      this.promise.reject()
    }
  }
}
</script>

<style lang="css">
</style>
