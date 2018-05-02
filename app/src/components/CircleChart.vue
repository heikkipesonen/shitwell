<template lang="html">
  <div class="circle-chart">
    <svg :style="size">
      <circle
        :fill="chart.background.fill"
        :stroke-width="chart.background.strokeWidth"
        :cx="chart.background.cx"
        :cy="chart.background.cy"
        :r="chart.background.r"
      ></circle>
      <path
        :fill="chart.path.fill"
        :stroke-width="chart.path.strokeWidth"
        :d="chart.path.d"
        >
      </path>
    </svg>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number
    },

    min: {
      type: Number,
      default: 0
    },

    max: {
      type: Number,
      default: 100
    }
  },

  data () {
    return {
      strokeWidth: 40,
      fill: 'none',
      arc: '',
      path: null,
      background: null,
      width: 0,
      height: 0
    }
  },

  computed: {

    size () {
      return {
        width: this.width + 'px',
        height: this.width + 'px'
      }
    },

    chart () {
      const min = this.min ? this.min : 0
      const max = this.max ? this.max : 100
      const range = max - min
      const value = this.value / range

      const endAngle = value > 1 ? 1 : value < 0 ? 0 : value
      const startAngle = 0

      const center = this.width / 2
      const pathData = this.describeArc(center, center, center - this.strokeWidth, startAngle, endAngle * 360)

      const path = {
        fill: this.fill,
        'strokeWidth': this.strokeWidth,
        'd': pathData
      }

      const background = {
        'fill': 'transparent',
        'strokeWidth': this.strokeWidth,
        'cx': center,
        'cy': center,
        'r': center - this.strokeWidth < 0 ? 0 : center - this.strokeWidth
      }

      return {
        path,
        background
      }
    }
  },

  methods: {
    polarToCartesian (centerX, centerY, radius, angleInDegrees) {
      const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0
      return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
      }
    },

    describeArc (x, y, radius, startAngle, endAngle) {
      const start = this.polarToCartesian(x, y, radius, endAngle)
      const end = this.polarToCartesian(x, y, radius, startAngle)
      const arcSweep = endAngle - startAngle <= 180 ? '0' : '1'
      const d = [
        'M', start.x, start.y,
        'A', radius, radius, 0, arcSweep, 0, end.x, end.y
      ].join(' ')

      return d
    },

    resize () {
      this.width = this.$el.offsetWidth
      this.height = this.$el.offsetHeight
    }
  },

  mounted () {
    this.resize()
    this.resize.bind(this)
    window.addEventListener('resize', this.resize)
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.resize)
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variables";

svg {
	&:hover, &:active, &:focus{
		outline: none;
	}
}

.circle-chart {
	position: relative;
	display: inline-block;
	text-align: center;
  width: 100%;

  .content {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

	svg {
		display: inline-block;
		width: 100%;
	}

	path {
    @include brand('primary', 'stroke');
	}

	circle {
    @include brand('secodary', 'stroke');
	}
}
</style>
