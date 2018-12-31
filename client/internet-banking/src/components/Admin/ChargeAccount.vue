<template>
  <panel title="Charge Account">
    <v-form ref="form" lazy-validation name="charge-account-form" autocomplete="off">
      <v-text-field label="Email" v-model="email" :rules="emailRules" required></v-text-field>
      <v-text-field label="Account No." v-model="accountNumber" :rules="requiredRules" required></v-text-field>
      <v-text-field
        label="Amount"
        type="number"
        v-model="amount"
        suffix="VND"
        :rules="requiredRules"
        required
      ></v-text-field>
    </v-form>
    <v-btn :loading="loading" dark class="cyan" @click="chargeAccount">Submit</v-btn>
  </panel>
</template>

<script>
import TransactionsService from "@/services/TransactionsService";

export default {
  name: "ChargeAccount",
  data() {
    return {
      email: "",
      accountNumber: "",
      amount: "",
      loading: false,
      emailRules: [
        v => !!v || "Email is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      requiredRules: [v => !!v || "This field is required"]
    };
  },
  methods: {
    async chargeAccount() {
      if (this.$refs.form.validate() && !this.loading) {
        try {
          this.loading = true;
          await TransactionsService.createTransaction({
            receiverEmail: this.email,
            receiverAccountId: this.accountNumber,
            amount: this.amount
          });

          this.$snotify.success("Charge account successfully");
        } catch (err) {
          this.$snotify.error(err.response.data.error);
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
