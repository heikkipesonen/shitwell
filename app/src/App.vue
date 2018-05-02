<template>
  <div class="app-container">
    <!-- <Login v-if="!isLoggedIn"></Login> -->
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Login from '@/views/Login'

export default {
  name: 'app',

  components: {
    Login
  },

  computed: {
    ...mapGetters({
      isLoggedIn: 'Login/login'
    })
  }
}
</script>

<style lang="scss">
@import 'styles/index';

.app-container {

}

</style>
