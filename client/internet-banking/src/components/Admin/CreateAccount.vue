<template>
  <panel title="Create Account">
    <v-form ref="form" lazy-validation name="create-account-form" autocomplete="off">
      <v-text-field label="Email" v-model="email" :rules="emailRules" required></v-text-field>
    </v-form>
    <v-btn :loading="loading" dark class="cyan" @click="createAccount">Submit</v-btn>
  </panel>
</template>

<script>
import AccountsService from "@/services/AccountsService";
export default {
  name: "CreateAccount",
  data() {
    return {
      email: "",
      loading: false,
      emailRules: [
        v => !!v || "Email is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    async createAccount() {
      if (this.$refs.form.validate() && !this.loading) {
        try {
          this.loading = true;
          await AccountsService.createAccount({
            email: this.email
          });

          this.$snotify.success("Create account successfully");
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
