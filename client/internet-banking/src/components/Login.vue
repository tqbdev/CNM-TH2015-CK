<template>
  <v-layout row>
    <v-flex xs6 offset-xs3>
      <panel title="Login">
        <v-form ref="form" lazy-validation name="request-receiver-login-form" autocomplete="off">
          <v-text-field label="Email" v-model="email" :rules="emailRules" required></v-text-field>
          <v-text-field
            label="Password"
            type="password"
            v-model="password"
            :rules="requiredRules"
            required
          ></v-text-field>
        </v-form>
        <v-btn :loading="loading" dark class="cyan" @click="login">Login</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthencationService from "@/services/AuthencationService";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      emailRules: [
        v => !!v || "Email is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      requiredRules: [v => !!v || "Password is required"]
    };
  },
  methods: {
    async login() {
      if (this.$refs.form.validate() && !this.loading) {
        try {
          this.loading = true;
          const response = await AuthencationService.login({
            email: this.email,
            password: this.password
          });

          this.$store.dispatch("setAccessToken", response.data.token);
          this.$store.dispatch("setRefreshToken", response.data.refreshToken);
          this.$store.dispatch("setUser", response.data.user);
          // this.$router.push({
          //   name: "home"
          // });
          this.$snotify.success("Login successfully");
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

<style scoped>
</style>
