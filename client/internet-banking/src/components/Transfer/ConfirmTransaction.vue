<template>
  <v-layout row wrap>
    <v-flex xs6 offset-xs3>
      <panel title="Confirm Transaction">
        <v-form ref="form" lazy-validation name="confirm-transaction-form" autocomplete="off">
          <v-text-field label="Code OTP" v-model="codeOTP" :rules="otpRules" required></v-text-field>
        </v-form>
        <v-btn :loading="loading" dark class="cyan" @click="submit">Submit</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";

import TransactionsService from "@/services/TransactionsService";

export default {
  name: "ConfirmTransaction",
  data() {
    return {
      transaction: null,
      codeOTP: null,
      loading: false,
      otpRules: [
        v => !!v || "This field is required",
        v =>
          (v && /^[0-9a-zA-Z]*$/.test(v)) ||
          "OTP code must be only alpha-numberic",
        v => (v && v.length == 6) || "OTP code must be 6 alpha-numberic"
      ]
    };
  },
  computed: {
    ...mapState(["route"])
  },
  async mounted() {
    const transactionId = this.route.params.transactionId;
    if (transactionId) {
      try {
        this.loading = true;
        this.transaction = (await TransactionsService.getTransaction(
          transactionId
        )).data.transaction;
      } catch (err) {
        this.$router.push({
          name: "404"
        });
      } finally {
        this.loading = false;
      }
    } else {
      this.$router.push({
        name: "404"
      });
    }
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate() && !this.loading) {
        try {
          this.loading = true;
          await TransactionsService.updateTransaction(this.transaction.id, {
            attributes: {
              codeVerify: this.codeOTP
            }
          });
          this.$snotify.success("Transaction successfully");
          this.$router.push({
            name: "home"
          });
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
