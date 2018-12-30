<template>
  <v-dialog v-if="receiver" v-model="isOpen" width="600" persistent>
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>Edit this receiver</v-card-title>

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
        <v-form ref="form" lazy-validation name="edit-receiver-form" autocomplete="off">
          <v-text-field label="Custom Name" v-model="name" :rules="requiredRules" required></v-text-field>
        </v-form>
      </v-card-actions>

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
  name: "EditReceiverDlg",
  props: {
    receiver: Object,
    isOpen: Boolean
  },
  data() {
    return {
      name: "",
      requiredRules: [v => !!v || "This field is required"]
    };
  },
  methods: {
    reject() {
      this.$emit("reject");
    },
    accept() {
      if (this.$refs.form.validate()) {
        this.$emit("accept", {
          id: this.receiver.id,
          name: this.name
        });
      }
    }
  }
};
</script>

<style>
</style>
