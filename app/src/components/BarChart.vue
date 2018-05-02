<template lang="html">
  <div class="chart-container">
    <div class="chart-wrapper" ref="wrapper">
      <svg :height="height" :width="width">
        <polyline :points="line" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  data () {
    return {
      height: 0,
      width: 0
    }
  },

  computed: {
    max () {
      return Math.ceil(this.model.reduce((max, item) => {
        return Math.max(max, item.value)
      }, 0))
    },

    min () {
      return Math.floor(this.model.reduce((min, item) => {
        return Math.min(min, item.value)
      }, Infinity))
    },

    ratio () {
      return this.height / this.max
    },

    barWidth () {
      return this.width / this.model.length
    },

    bars () {
      return this.model.map((item, index) => {
        return {
          ...item,
          y: this.height - item.value * this.ratio,
          x: index * this.barWidth,
          height: item.value * this.ratio
        }
      })
    },

    line () {
      return this.model.reduce((line, item, index) => {
        const point = [
          index * this.barWidth,
          this.height - item.value * this.ratio
        ]

        return line + ' ' + point.join(',')
      }, '') + ` ${this.width},${this.height + 1}  0,${this.height + 1}`
    }
  },

  mounted () {
    this.height = this.$refs.wrapper.offsetHeight
    this.width = this.$refs.wrapper.offsetWidth
  }
}
</script>

<style lang="scss" scoped>
.chart-container {
  padding: 16px;
}

.chart-wrapper {
  display: block;
  min-height: 300px;
}

polyline {
  stroke: rgb(255, 42, 132);
  stroke-width: 1;
  fill: rgba(255, 42, 132, 0.3);
}

rect {
  stroke: none;
  fill: rgb(255, 42, 132);
}
</style>
