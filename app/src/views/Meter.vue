<template lang="html">
  <ViewContainer
    :back="{name: 'Root'}"
    :header="device && (device.name || device.id)"
    :subheader="device && device.status"
  >

  <div class="chart--container">
    <CircleChart :value="level">
      <h2>{{ level.toFixed(2) }}%</h2>
      <h3>{{ remainingDistance }}/{{ maxVolume }}</h3>
      <h3 v-if="device.meter">{{ device.meter.timeStamp | datetime }}</h3>
    </CircleChart>
  </div>

  <div slot="toolbar">
    <button class="control" @click="openEditor">
      <i class="ion-ios-settings-outline"></i>
    </button>
  </div>

  <DeviceEditor ref="editor"></DeviceEditor>

  </ViewContainer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import DeviceEditor from '@/components/DeviceEditor'

export default {
  components: {
    DeviceEditor
  },

  props: {
    deviceId: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapGetters({
      device: 'Devices/status'
    }),

    remainingDistance () {
      const value = (this.device.meter && this.device.meter.value) || 0
      const fullLevel = this.device.minLevel
      const remaining = value - fullLevel
      return remaining
    },

    maxVolume () {
      return this.device.maxLevel - this.device.minLevel
    },

    level () {
      const remaining = this.remainingDistance
      const maxVolume = this.device.maxLevel - this.device.minLevel
      const percentageRemaining = (remaining || 1) / maxVolume * 100
      const percentageUsed = 100 - percentageRemaining

      return percentageUsed || 0
    }
  },

  methods: {
    ...mapActions({
      getStatus: 'Devices/getStatus'
    }),

    openEditor () {
      this.$refs.editor.open(this.device)
        .then((device) => {
          console.log(device)
        }, (e) => {})
    },

    startListen () {
      this.getStatus({
        deviceId: this.deviceId
      })

      this.interval = setInterval(() => {
        this.getStatus({
          deviceId: this.deviceId
        })
      }, 10 * 1000)
    }
  },

  mounted () {
    this.startListen()
  },

  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>

<style lang="scss" scoped>
  .chart--container {
    position: relative;
    width: 500px;
    max-width: 90vw;
    margin: auto;
  }

  h2 {
    font-size: 2rem;
    font-weight: bold;
  }
</style>
