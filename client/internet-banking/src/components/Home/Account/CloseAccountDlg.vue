<template>
  <v-dialog v-if="account" v-model="isOpen" width="600" persistent>
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>Do you want close this account</v-card-title>

      <v-card-text>
        <v-layout row wrap class="text-xs-left">
          <v-flex xs4>Account ID:</v-flex>
          <v-flex xs8>{{ account.id }}</v-flex>
          <v-flex xs4>Balance:</v-flex>
          <v-flex xs8>{{ account.balance }}</v-flex>
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
  name: "CloseAccountDlg",
  props: {
    account: Object,
    isOpen: Boolean
  },
  methods: {
    reject() {
      this.$emit("reject");
    },
    accept() {
      this.$emit("accept", this.account);
    }
  }
};
</script>

<style>
</style>
