<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$store.commit('user/initUserInfo')
  }
}
</script>
