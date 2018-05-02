<template lang="html">
  <div class="input-container">
    <input :type="type" v-model="inputValue">
    <label>{{ displayLabel }}</label>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    },

    label: {
      type: String,
      default: ''
    },

    type: {
      type: String,
      default: 'text'
    },

    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    displayLabel () {
      return this.label ? this.label : this.name
    },

    inputValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.input-container {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 1.2em;
  padding-bottom: 1em;
}

input {
  display: block;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 8px;
  border-bottom: 1px solid #d00;
  border-radius: 0;
}

label {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 1rem;
}

</style>
