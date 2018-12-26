<template>
  <panel title="Add Receiver">
    <v-form ref="form" lazy-validation name="add-receiver-form" autocomplete="off">
      <v-text-field label="Account No." v-model="accountNumber" :rules="requiredRules" required></v-text-field>
      <v-text-field label="Custom Name" v-model="name"></v-text-field>
    </v-form>
    <v-btn :loading="loading" dark class="cyan" @click="addReceiver">Add</v-btn>
  </panel>
</template>

<script>
import ReceiversService from "@/services/ReceiversService";
export default {
  name: "AddReceiver",
  data() {
    return {
      name: "",
      accountNumber: "",
      loading: false,
      requiredRules: [v => !!v || "This field is required"]
    };
  },
  methods: {
    async addReceiver() {
      if (this.$refs.form.validate() && !this.loading) {
        try {
          this.loading = true;
          await ReceiversService.createReceiver({
            name: this.name,
            accountId: this.accountNumber
          });

          this.$snotify.success("Create receiver successfully");
        } catch (error) {
          this.$snotify.error(error.response.data.error);
        } finally {
          this.loading = false;
        }
      }
    }
  }
};
</script>

<style>
</style>
