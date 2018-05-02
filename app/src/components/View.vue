<template lang="html">
  <div class="view">
    <div class="view-header">
      <router-link v-if="back" :to="back">
        <i class="ion-ios-arrow-dropleft"></i>
      </router-link>
      <div class="view-header__header">{{ header }}</div>
      <span class="subheader">{{ subheader }}</span>
    </div>
    <div class="view-content">
      <div class="view--content__wrapper">
        <slot></slot>
      </div>
    </div>
    <div class="view--controls">
      <slot name="toolbar"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    back: {
      type: Object
    },
    header: {
      type: String
    },
    subheader: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.view {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.view-content {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;

  .view--content__wrapper {
    position: absolute;
    top: 0; left:0 ; right: 0; bottom: 0;
    padding: 16px;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
}

.view-header {
  position: relative;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @include brand('primary', 'background-color');
  color: white;

  i {
    position: absolute;
    top: 16px;
    left: 16px;
    color: white;
    font-size: 2em;
  }
}

.view-header__header {
  text-transform: uppercase;
}

.view--controls {
  display: flex;
  flex-direction: row-reverse;
  padding: 0 16px;
}

</style>
