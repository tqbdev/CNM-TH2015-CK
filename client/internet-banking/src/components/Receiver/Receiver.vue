<template>
  <v-layout row wrap>
    <v-flex xs6 offset-xs3>
      <add-receiver></add-receiver>
    </v-flex>
    <v-flex xs6 offset-xs3 mt-4>
      <list-receiver></list-receiver>
    </v-flex>
  </v-layout>
</template>

<script>
import AddReceiver from "./AddReceiver";
import ListReceiver from "./ListReceiver";
export default {
  components: {
    AddReceiver,
    ListReceiver
  }
};
</script>

<style>
</style>
