<template>
  <div class="auth">
    <p class="page-title">Please scan your badge</p>
    <user-scanner @scanned="$router.push('/validate')"/>
  </div>
</template>

<script>
export default {
  name: 'AppAuth',

  components: {
    UserScanner: () => import('./UserScanner'),
  },
};
</script>

<style scoped>
  .page-title {
    padding   : 15px 0;
    font-size : 1.2em;
  }
</style>
