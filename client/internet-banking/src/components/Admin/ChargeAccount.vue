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
    async chargeAccount() {}
  }
};
</script>

<style>
</style>
