<template lang="html">
  <div class="sidepane" v-if="visible" @click="hide">
    <div class="sidepane--container" @click.stop="">
      <div class="sidepane--header">
        <slot name="header"></slot>
      </div>
      <div class="sidepane--content__wrapper">
        <div class="sidepane--content">
          <slot></slot>
        </div>
      </div>
      <div class="sidepane--footer">
        <slot name="toolbar"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean
  },

  computed: {
    visible: {
      get () {
        return this.value
      },

      set (value) {
        this.$emit('input', value)
      }
    }
  },

  methods: {
    hide () {
      console.log('hide', this.visible)
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.sidepane {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
}

.sidepane--container {
  position: absolute;
  top: 0; left: auto; right: 0; bottom: 0;
  width: 700px;
  max-width: 95vw;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 50px -10px rgba(0, 0, 0, 1);
  display: flex;
  flex-direction: column;
}

.sidepane--header {
  display: flex;
  flex-direction: column;
}

.sidepane--footer {
  display: flex;
  flex-direction: row-reverse;
  padding: 0 16px;
  button {
    margin: 8px;
  }
}

.sidepane--content__wrapper {
  position: relative;
  flex: 1;
}

.sidepane--content {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  overflow-y: auto;
  padding: 2em;
}
</style>
