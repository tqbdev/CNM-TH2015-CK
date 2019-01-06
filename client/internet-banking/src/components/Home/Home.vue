<template>
  <v-layout row wrap>
    <v-flex xs10 offset-xs1>
      <account></account>
    </v-flex>
    <v-flex xs10 offset-xs1 mt-4>
      <histories></histories>
    </v-flex>
  </v-layout>
</template>

<script>
import Account from "./Account/Account";
import Histories from "./Histories";

export default {
  name: "Home",
  components: {
    Account,
    Histories
  }
};
</script>

<style>
</style>
