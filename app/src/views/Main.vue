<template lang="html">
  <ViewContainer
    header="Devices"
    subheader="kissakala"
    >

    <List :value="devices">
      <div slot-scope="props">
        <router-link :to="{ name: 'Device', params: { deviceId: props.model.id } }">
          <div>{{ props.model.name || props.model.id }}</div>
          <div>{{ props.model.status }}</div>
        </router-link>
      </div>
    </List>
  </ViewContainer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      devices: 'Devices/devices'
    })
  },

  methods: {
    ...mapActions({
      getDeviceList: 'Devices/list'
    })
  },

  mounted () {
    this.getDeviceList().then((list) => {
      console.log(list)
    })
  }
}
</script>

<style lang="scss">
</style>
