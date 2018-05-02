<template lang="html">
  <ViewContainer>
    <ViewContent class="layout-center">
      <InputContainer v-model="email" type="email" name="email" />
      <InputContainer v-model="password" type="password" name="password" />
      <button @click="() => login({email, password})">Login</button>
    </ViewContent>
  </ViewContainer>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      email: 'test@test.test',
      password: 'kissakala'
    }
  },

  methods: {
    ...mapActions({
      login: 'Login/login'
    })
  }
}
</script>

<style lang="css">
</style>
