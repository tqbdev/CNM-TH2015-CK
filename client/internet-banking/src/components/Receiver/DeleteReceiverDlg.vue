<template>
  <v-dialog v-if="receiver" v-model="isOpen" width="600" persistent>
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>Do you want delete this receiver</v-card-title>

      <v-card-text>
        <v-layout row wrap class="text-xs-left">
          <v-flex xs4>Name:</v-flex>
          <v-flex xs8>{{ receiver.name }}</v-flex>
          <v-flex xs4>Account ID:</v-flex>
          <v-flex xs8>{{ receiver.AccountId }}</v-flex>
        </v-layout>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" flat @click="accept">Yes</v-btn>
        <v-btn color="success" flat @click="reject">No</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DeleteReceiverDlg",
  props: {
    receiver: Object,
    isOpen: Boolean
  },
  methods: {
    reject() {
      this.$emit("reject");
    },
    accept() {
      this.$emit("accept", this.receiver);
    }
  }
};
</script>

<style>
</style>
