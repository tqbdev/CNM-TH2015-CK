<template>
  <v-layout row wrap>
    <v-flex xs10 offset-xs1>
      <account></account>
    </v-flex>
    <v-flex xs10 offset-xs1></v-flex>
  </v-layout>
</template>

<script>
import Account from "./Account/Account";

export default {
  name: "Home",
  components: {
    Account
  }
};
</script>

<style>
</style>
