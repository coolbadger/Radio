<template>
  <div>
    <Button @click="logout" type="primary">Logout</Button>
  </div>
</template>

<script>

  import Cookies from 'js-cookie';

  export default {
    name: "Main",
    methods: {
      logout: function (event) {
        Cookies.remove('user');
        this.$router.push({
          name: 'login'
        });
      }
    }
  }

</script>

<style scoped>

</style>
