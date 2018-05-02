<template lang="html">
  <div class="list">
    <div class="list-item" v-for="item in value">
      <slot :model="item"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;

  .list-item {
    display: flex;
    flex-direction: row;
    padding: 16px;

    &:not(:first-child) {
      border-top: 1px solid #ddd;
    }
  }
}
</style>
